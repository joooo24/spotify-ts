import { Button } from '@mui/material';
import React from 'react'
import { getSpotifyAuthUrl } from '../../utils/auth';

type Props = {}

const LoginButton = (props: Props) => {
    const handleLogin = () => {
        getSpotifyAuthUrl();
    }
    
    return (
        <Button variant="contained" color="secondary" size="large" onClick={handleLogin}>
            Login
        </Button>
    )
}

export default LoginButton;