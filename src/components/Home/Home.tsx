import _React from "react";
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import { NavBar } from '../sharedComponents'
import shop_image from '../../assets/images/car_with_trees.jpg'
interface Props {
    title: string
}

const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('div')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${shop_image});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 5px',
    position: 'absolute',
    marginTop: '10px'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})

export const Home = (props: Props) => {

    return (
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <h1> {props.title} </h1>
                    <Button sx={{ marginTop: '10px' }} component={Link} to={localStorage.getItem('auth') === 'true' ? '/shop' : '/auth'} variant='contained'>Let's talk Cars!</Button>
                </MainText>
            </Main>
        </Root>
    )
}