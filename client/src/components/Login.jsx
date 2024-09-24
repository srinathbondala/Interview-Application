import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './Navbar';
import loginImage from '/imgs/login2.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
    
    const [userType, setUserType] = useState('USER');
    function handleTypeChange(e,newUserType){
        setUserType(newUserType)
    }
    return (
        <>
            <Grid container sx={{ height: '90vh' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            height: '100%',
                            backgroundImage: `url(${loginImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7faff', padding: 4 }}>
                    <Box sx={{ maxWidth: 400, width: '100%' }}>
                        <Box sx={{display:'flex',justifyContent: 'center', mb: 2 }} >
                        <AccountCircleIcon sx={{ fontSize:50}} />
                        </Box>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                            Welcome Again
                        </Typography>
                        <Typography variant='body1' sx={{ textAlign: 'center', mb: 2 }}>
                            Please enter your details to login:)
                        </Typography>
                        <ToggleButtonGroup 
                            exclusive
                            value={userType}
                            onChange={handleTypeChange}
                            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                        >
                            <ToggleButton  value="USER" >User</ToggleButton>
                            <ToggleButton value="ADMIN" >Admin</ToggleButton>
                        </ToggleButtonGroup>
                        <form>
                            <TextField
                                label="Email"
                                name="email"
                                type='email'
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type='password'
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2, borderRadius: '20px' }} // Rounded border
                            >
                                <AddIcon sx={{ mr: 1 }} /> Submit
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
