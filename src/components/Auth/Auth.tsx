import * as React from 'react'
import { styled } from '@mui/system'

//internal imports
import FormExample from '../Form/Form'
import car from '../../assets/images/car_with_nice.jpg'

import { NavBar } from '../sharedComponents'
interface Props{
    title:string
}

const Main = styled('div')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${car});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 5px',
    position: 'absolute', 
    marginTop: '10px'
})

export const Auth = (props: Props) => {
    return (
        <div>
            <NavBar/>
            <Main>
                <h1>{props.title}</h1>
                <FormExample/>
            </Main>
        </div>
        
    )
}