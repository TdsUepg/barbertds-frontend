import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f2c84b',
    },
    secondary: {
      main: '#333333',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#333333',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#333333',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#fff !important',
          backgroundColor: '#333333 !important',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
          borderRadius: '4px',
          padding: '0px 8px',
          marginLeft: '-4px',

          '&.Mui-shrink': {
            backgroundColor: '#f2c84b',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: '#000 !important',
          backgroundColor: '#f2c84b !important',
          borderRadius: '12px !important',

          '&.Mui-disabled': {
            backgroundColor: '#b5a165 !important',
            opacity: '0.4 !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414 !important',
          borderRadius: '24px',
        },
      },
    },
  },
})
