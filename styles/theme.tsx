import { createTheme } from '@mui/material/styles';

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
    MuiTextField:{
        styleOverrides: {
            root: {
                borderRadius: '20px',
            },
        },
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                color: "#fff",
                backgroundColor: '#333333',
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                color: "#fff",
                backgroundColor: '#333333',
                borderRadius: '4px',
                padding: '0px 8px',
                marginLeft: '-4px',

                "&.Mui-shrink": {
                  backgroundColor: "#f2c84b"
                }
            },
        },
    },
    MuiButtonBase: {
        styleOverrides: {
            root: {
                color: '#000 !important',
                backgroundColor: '#f2c84b !important',
                borderRadius: '12px !important',
            },
        },
    },
  },
});
