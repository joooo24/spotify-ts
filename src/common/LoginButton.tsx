import { Button } from '@mui/material';
import React from 'react'

type Props = {}

const LoginButton = (props: Props) => {
    return (
        <Button variant="contained" color="secondary" size="large">
            로그인
        </Button>
    )
}

export default LoginButton;