import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './Navbar';
import loginImage from '/imgs/signup2.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
    const [userType, setUserType] = useState('USER');
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        password: '',
        secretKey: ''
    });

    function handleTypeChange(e, newUserType) {
        setUserType(newUserType);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Here you can send the form data to your backend
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('User created:', data);
            // Handle successful user creation (e.g., redirect, show success message)
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle errors (e.g., show error message)
        }
    };

    return (
        <>
            <Grid container sx={{ height: '90vh' }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7faff', padding: 4 }}>
                    <Box sx={{ maxWidth: 400, width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <AccountCircleIcon sx={{ fontSize: 50 }} />
                        </Box>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                            Get Started
                        </Typography>
                        <Typography variant='body1' sx={{ textAlign: 'center', mb: 2 }}>
                            Please enter the details to Register yourself :)
                        </Typography>
                        <ToggleButtonGroup
                            exclusive
                            value={userType}
                            onChange={handleTypeChange}
                            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                        >
                            <ToggleButton value="USER">User</ToggleButton>
                            <ToggleButton value="ADMIN">Admin</ToggleButton>
                        </ToggleButtonGroup>
                        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }} // Ensure the label is always visible
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type='password'
                                    fullWidth
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {userType === "ADMIN" && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="Secret Key"
                                        name="secretKey"
                                        type='password'
                                        fullWidth
                                        variant="outlined"
                                        value={formData.secretKey}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    sx={{ mt: 2, borderRadius: '20px' }} // Rounded border
                                >
                                    <AddIcon sx={{ mr: 1 }} /> Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
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
            </Grid>
        </>
    );
};

export default Login;
