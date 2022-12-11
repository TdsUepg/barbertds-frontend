import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import api from 'api'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { parseCookies } from 'nookies'
import ContentCut from '@mui/icons-material/ContentCut'
import Skeleton from '@mui/material/Skeleton'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AuthContext } from 'contexts/AuthContext'
import type { AuthContextType } from 'contexts/AuthContext'
import Card from 'components/Card'
import { Appointment, DatePickerValue } from './types'
import TextField from '@mui/material/TextField'
import { formatISO } from 'date-fns'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Icon from 'components/Icon'

const Dashboard: React.FC = () => {
  const { ['nextauth.email']: email } = parseCookies(null)
  const snackbar = useSnackbar()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { user, signOut, setUser } = useContext(AuthContext) as AuthContextType
  const [date, setDate] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    api()
      .get(`/barber/${email}`)
      .then((response) => {
        if (response.data) {
          setUser(response.data)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)

    api()
      .get(
        `appointment/barber/${email}/day/${formatISO(date, {
          representation: 'date',
        })}`,
      )
      .then((response) => {
        if (response.data) {
          setAppointments(response.data.appointments)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [date])

  function onCloseModal(): void {
    setOpenModal(false)
  }

  async function onHandleConfirm(): Promise<void> {
    try {
      if (selectedAppointment) {
        const response = await api().put(
          `appointment/${selectedAppointment.id}`,
        )

        if (response.data) {
          snackbar.enqueueSnackbar('Agendamento atualizado com sucesso!', {
            variant: 'success',
          })
        }
      }
    } catch (err) {
      console.error(err)
    }

    setOpenModal(false)
  }

  return (
    <div className="w-full h-screen flex flex-col items-center p-4">
      <div className="max-w-[500px] w-full h-full flex flex-col items-center">
        <div className="w-full flex justify-end">
          <Link href="/">
            <span
              className="text-xl text-[#f2c84b]"
              onClick={() => {
                void signOut()
              }}
            >
              Sair
            </span>
          </Link>
        </div>

        <div className="w-full flex flex-col items-start pb-8">
          <h2 className="text-3xl">
            <strong>Olá, {user?.name}!</strong>
          </h2>

          <div className="flex items-center pt-4">
            <p className="">Confira sua agenda</p>
            <Tooltip
              arrow
              title="Você pode confirmar seus agendamentos, clicando neles e clicando em 'Confirmar'"
              className="ml-2"
            >
              <InfoOutlinedIcon htmlColor="#fff" />
            </Tooltip>
          </div>

          <div className="mt-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                value={date}
                onChange={(newValue: DatePickerValue | null) => {
                  if (newValue) {
                    setDate(newValue['$d'])
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="DD/MM/YYYY"
                disablePast
              />
            </LocalizationProvider>
          </div>
        </div>

        {isLoading && (
          <>
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width="100%"
              height={100}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width="100%"
              height={100}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              className="!bg-gray-500 opacity-40 mt-4 mb-4 !rounded-[20px]"
              width="100%"
              height={100}
            />
          </>
        )}

        <div className="w-full flex-grow overflow-y-scroll">
          {!isLoading &&
            appointments &&
            appointments.length > 0 &&
            appointments.map((appointment) => (
              <Card
                key={appointment.id}
                title={appointment.service.name}
                value={Number(appointment.service.value)}
                icon={
                  <Icon
                    iconName={appointment.service.iconName}
                    variant="primary"
                  />
                }
                appointment={{
                  date: appointment.date,
                  startTime: appointment.startTime,
                  endTime: appointment.endTime,
                }}
                onClick={() => {
                  setSelectedAppointment(appointment)
                  setOpenModal(true)
                }}
              />
            ))}

          {!isLoading && (!appointments || appointments.length === 0) && (
            <p className="text-white align-middle self-center text-center h-full">
              Nenhum agendamento para este dia
            </p>
          )}
        </div>

        <div className="flex-shrink-0 pt-2">
          <Link href="/professional-dashboard/service">
            <span className="font-bold text-[#f2c84b]">Editar serviços</span>
          </Link>
        </div>
      </div>

      <Dialog
        open={openModal}
        onClose={onCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Tem certeza que deseja confirmar este agendamento?
        </DialogTitle>
        <DialogActions>
          <Button
            className="!bg-transparent !text-white font-light"
            onClick={onCloseModal}
          >
            Voltar
          </Button>
          <Button onClick={onHandleConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Dashboard
