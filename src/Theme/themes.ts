import { createTheme } from '@mui/material'

export const theme = createTheme({
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#3E252B'
        },
        secondary: {
            main: '#161616'
        },
        info : {
            main: '#44469D'
        }
    }
})