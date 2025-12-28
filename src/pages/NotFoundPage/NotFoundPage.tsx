import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            gap={2}
        >
            <Typography variant="h1" component="h1">
                404
            </Typography>
            <Typography variant="h5" component="h2">
                Page Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
                The page you are looking for does not exist.
            </Typography>
        </Box>
    );
};

export default NotFoundPage;

