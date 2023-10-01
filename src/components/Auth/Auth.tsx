import * as _React from 'react'
import { useState } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Typography,
    Stack,
    Divider,
    CircularProgress,
    Snackbar,
    Dialog,
    DialogContent,
    Alert
} from '@mui/material'

//internal imports
// import FormExample from '../Form/Form'
import car from '../../assets/images/car_with_nice.jpg'
import { InputText, InputPassword } from '../sharedComponents'
import { NavBar } from '../sharedComponents'

interface Props {
    title: string
}

interface ButtonProps {
    open: boolean
    onClick: () => void
}

interface SubmitProps {
    email: string
    password: string
}

export type MessageType = 'error' | 'warning' | 'info' | 'success'

const authStyles = {

    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${car});`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 5px',
        position: 'absolute',
        marginTop: '10px'
    },
    stack: {
        width: '350px',
        marginTop: '100px',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    button: {
        width: '150px',
        fontSize: '14px'
    }
}

const GoogleButton = (_props: ButtonProps) => {
    //setting up our hooks to manage the state of some things
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [messageType, setMessageType] = useState<MessageType>()
    const navigate = useNavigate()  //instantiate that useNavigate() object to use
    const auth = getAuth()
    const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth)

    const signIn = async () => {
        await signInWithGoogle()

        localStorage.setItem('auth', 'true')
        onAuthStateChanged(auth, (user) => {

            if (user) {
                localStorage.setItem('user', user.email || '')
                localStorage.setItem('token', user.uid || '')
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => { navigate('/') }, 2000) //needs to point to shop eventually
            }
        })

        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }

        if (loading) {
            return <CircularProgress />
        }
    }

    return (
        <Box>
            <Button
                variant='contained'
                color='info'
                size='large'
                sx={authStyles.button}
                onClick={signIn}
            >
                Sign In With Google
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}

const SignIn = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [messageType, setMessageType] = useState<MessageType>()
    const navigate = useNavigate() // instantiate that useNavigate() object to use
    const auth = getAuth() //essentially monitoring the state of our authorization
    const { register, handleSubmit } = useForm<SubmitProps>({})

    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault()

        console.log(data.email, data.password)
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Signed In
                localStorage.setItem('auth', 'true')
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        localStorage.setItem('token', user.uid || '')
                        localStorage.setItem('user', user.email || '')
                    }
                })
                const user = userCredential.user
                //once a user is signed in we can display a success message
                setMessage(`Successfully logged in user ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => { navigate('/') }, 2000) //needs to point to shop eventually
            })
            .catch((error) => {
                const errorMessage = error.message
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            })
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Into Your Account</Typography>
                <Box>
                    <label htmlFor="email"></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor="password"></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 or more characters' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

const SignUp = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [messageType, setMessageType] = useState<MessageType>()
    const navigate = useNavigate() // instantiate that useNavigate() object to use
    const auth = getAuth() //essentially monitoring the state of our authorization
    const { register, handleSubmit } = useForm<SubmitProps>({})

    const onSubmit: SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault()

        console.log(data.email, data.password)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Signed In
                localStorage.setItem('auth', 'true')
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        localStorage.setItem('token', user.uid || '')
                        localStorage.setItem('user', user.email || '')
                    }
                })
                const user = userCredential.user
                //once a user is signed in we can display a success message
                setMessage(`Successfully logged in user ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => { navigate('/shop') }, 2000)
            })
            .catch((error) => {
                const errorMessage = error.message
                setMessage(errorMessage)
                setMessageType('error')
                setOpen(true)
            })
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Up for FREE</Typography>
                <Box>
                    <label htmlFor="email"></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor="password"></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 or more characters' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert severity={messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export const Auth = (props: Props) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [signType, setSignType] = useState('')

    const handleSnackClose = () => {
        setOpen(false)
        navigate('shop')
    }
    return (
        <Box>
            <NavBar />
            <Box sx={authStyles.main}>
                <Stack direction='column' alignItems='center' textAlign='center' sx={authStyles.stack}>
                    <Typography variant='h2' sx={{ color: 'white' }}>
                        {props.title}
                    </Typography>
                    <br />
                    <Typography variant='h5'>Track your shop items for free!</Typography>
                    <br />
                    <GoogleButton open={open} onClick={handleSnackClose} />
                    <Divider variant='fullWidth' color='width' />
                    <Stack
                        alignItems='center'
                        justifyContent='space-between'
                        direction='row'
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={authStyles.button}
                            onClick={() => { setOpen(true); setSignType('signin') }}
                        >
                            Email Login
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            sx={authStyles.button}
                            onClick={() => { setOpen(true); setSignType('signup') }}
                        >
                            Email Sign Up
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        {signType === 'signin' ? <SignIn /> : <SignUp />}
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )
}