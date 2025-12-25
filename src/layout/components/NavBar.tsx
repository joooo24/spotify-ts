import React from 'react'
import LoginButton from '../../common/components/LoginButton';
import { Box } from '@mui/material';

type Props = {}

const NavBar = (props: Props) => {
    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            height="64px">
            <LoginButton />
        </Box>
    )
}

export default NavBar;