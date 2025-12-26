import { Alert } from '@mui/material'
import React from 'react'

type ErrorMessageProps = {
    errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
    return (
        <Alert severity="error">{errorMessage}</Alert>
    )
}

export default ErrorMessage;