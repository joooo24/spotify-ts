import { Button } from '@mui/material';
import React from 'react'

type Props = {}

const LoginButton = (props: Props) => {
    return (
        <Button variant="contained" color="secondary" size="large">
            Login
        </Button>
    )
}

export default LoginButton;