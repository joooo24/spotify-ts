import { Avatar, Box, IconButton, Menu, MenuItem, styled, } from "@mui/material";
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { data: userProfile } = useGetCurrentUserProfile();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        handleMenuClose();
        window.location.reload();
    };

    return (
        <Container>
            {userProfile ? (
                <ProfileContainer>
                    <IconButton onClick={handleMenuOpen} size="small">
                        {userProfile.images?.[0]?.url ? (
                            <Avatar
                                src={userProfile.images[0].url}
                                alt={userProfile.display_name || 'Profile'}
                            />
                        ) : (
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        )}
                    </IconButton>
                    <ProfileMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        keepMounted
                    >
                        <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
                    </ProfileMenu>
                </ProfileContainer>
            ) : (
                <LoginButton />
            )}
        </Container>
    );
};

export default NavBar;

const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '64px',
    paddingRight: '8px',
});

const ProfileContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
    "& .MuiPaper-root": {
        color: "white",
        minWidth: "160px",
    },
});

const ProfileMenuItem = styled(MenuItem)({
    "&:hover": {
        backgroundColor: "#444",
    },
});