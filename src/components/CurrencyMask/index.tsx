import { ReactElement, useState } from 'react'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
  prefix: 'R$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

interface CurrencyInputProps {
  inputmode: string
  placeholder: string | undefined
  maskOptions: {
    prefix: string
    suffix: string
    includeThousandsSeparator: boolean
    thousandsSeparatorSymbol: string
    allowDecimal: boolean
    decimalSymbol: string
    decimalLimit: string
    requireDecimal: boolean
    allowNegative: boolean
    allowLeadingZeroes: boolean
    integerLimit: number
  }
  onSetValue: (value: string) => void
}

const CurrencyInput = ({
  placeholder,
  maskOptions,
  onSetValue,
  ...inputProps
}: CurrencyInputProps): ReactElement => {
  const [isTouched, setIsTouched] = useState(false)

  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })

  return (
    <div className="relative">
      <label
        className={`text-[12px] absolute bg-[#333333] -top-2 left-3 px-2 rounded-[3px] ${
          isTouched ? 'text-#f2c84b' : 'text-black'
        }`}
      >
        Preço *
      </label>
      <MaskedInput
        required
        onChange={(event) => {
          const value = event.target.value

          onSetValue(value)
        }}
        onFocus={() => {
          setIsTouched(true)
        }}
        onBlur={() => {
          setIsTouched(false)
        }}
        mask={currencyMask}
        placeholder={placeholder ?? 'R$ 0.00'}
        {...inputProps}
        style={{
          color: '#fff',
          width: '100%',
          borderRadius: '4px',
          padding: '16.5px 14px',
          backgroundColor: '#333333',
        }}
      />
    </div>
  )
}

CurrencyInput.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
}

export default CurrencyInput
