import { Button } from '@mui/material';
import React from 'react'
import { getSpotifyAuthUrl } from '../../utils/auth';

type Props = {}

const LoginButton = (props: Props) => {
    const login = () => {
        console.log("login");
        getSpotifyAuthUrl();
    }
    return (
        <Button variant="contained" color="secondary" size="large" onClick={login}>
            Login
        </Button>
    )
}

export default LoginButton;