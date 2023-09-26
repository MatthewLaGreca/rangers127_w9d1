import 'styled-components'
import { Theme } from '@mui/material/styles'

//overriding styled-components using the Theme module
//anywhere we are referencing 'theme' in our styled components aka CSS it will look at our module
declare module 'styled-components'{
    export interface DefaultTheme extends Theme {}
}