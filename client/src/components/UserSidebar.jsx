import React from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';

const UserSideBar = ({ user, onProfileClick, onTopCompaniesClick }) => {
    return (
        <Box 
            sx={{ 
                marginTop: 7,
                borderRadius: 2,
                minWidth: '250px', 
                height: '60vh', 
                bgcolor: '#f6f6f6', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '16px', 
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' 
            }}
        >
            <Avatar 
                sx={{ 
                    width: 100, 
                    height: 100, 
                    mb: 2 
                }} 
                src={'/imgs/boy.png'} 
            />
            <Typography variant="h6" sx={{ mb: 2 }}>
                {JSON.parse(localStorage.getItem('Details')).username}
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mb: 1 }} 
                onClick={onProfileClick}
            >
                Profile
            </Button>
            <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth 
                sx={{ mb: 1 }} 
            >
                Applied Jobs
            </Button>
            <Button 
                variant="outlined" 
                color="primary" 
                fullWidth 
                onClick={onTopCompaniesClick}
            >
                Top Companies
            </Button>
        </Box>
    );
};

export default UserSideBar;
