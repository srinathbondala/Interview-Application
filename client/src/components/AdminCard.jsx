import React, { useState } from 'react';
import { 
    Card, 
    CardHeader, 
    CardContent, 
    IconButton, 
    Typography, 
    Avatar, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Box, 
    Grid, 
    Paper, 
    Divider 
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import applicationsData from '../application.json';

const SimpleCard = (props) => {
    const { companyName, role, experience, technicalSkills, salaryRange, description } = props;
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <Card elevation={2} sx={{ borderRadius: 2,background:`url('/imgs/cardBg.png')`,backgroundPosition:'center',backgroundSize:'cover', transition: '0.3s', '&:hover': { boxShadow: 6 }, mb: 2,display:'flex',flexDirection:'column' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        {companyName[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton>
                        <DeleteOutlined sx={{ color: 'black' }} />
                    </IconButton>
                }
                title={
                    <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1.2rem' }}>
                        {companyName}
                    </Typography>
                }
                subheader={
                    <Typography sx={{ fontWeight: 'bold', color: 'grey', fontSize: '0.9rem' }}>
                        {role} ({experience} years)
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant='body2' color='grey' sx={{ 
                mb: 1,
                maxHeight: '1.5em',
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
                }}>
                    Technical Skills: {technicalSkills.join(', ')}
                </Typography>
                {salaryRange && (
                    <Typography variant='body2' color='grey' sx={{ mb: 1 }}>
                        Salary Range: {salaryRange}
                    </Typography>
                )}
                {description && (
                    <Typography variant='body2' color='grey' sx={{ mb: 1 }}>
                        {description}
                    </Typography>
                )}
            </CardContent>
            <Button sx={{ m: 1 }} variant="outlined" color="primary" onClick={handleDialogOpen}>
                View Applications
            </Button>

            {/* Dialog for Applications */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor:'#f4f4f4',
                        borderRadius: 4,
                        boxShadow: 4,
                        maxHeight: '85%',
                    },
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                    {companyName.toUpperCase()} Applications Overview
                </DialogTitle>
                <DialogContent sx={{ padding: '16px' }}>
                    <Grid container spacing={2}>
                        {/* New Column */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center',color:'white',backgroundColor:'#1976d2',borderRadius:2, pb: 1,padding: '8px 16px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
                                New Applications
                            </Typography>
                            <Box sx={{ height: '60vh', overflowY: 'auto', padding: '8px', borderRadius: '8px'}}>
                                {applicationsData.slice(0, 6).map((app, index) => (
                                    <Paper elevation={3} key={index} sx={{ padding: 2, mb: 2, borderRadius: 2 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{app.name}</Typography>
                                        <Typography variant="body2">Role: {app.role}</Typography>
                                        <Typography variant="body2">Experience: {app.experience} years</Typography>
                                        <Typography variant="body2">Skills: {app.skills.join(', ')}</Typography>
                                        <Typography variant="body2">GPA: {app.gpa}</Typography>
                                        <Typography variant="body2">College: {app.college}</Typography>
                                        <Box sx={{ height: '5px', backgroundColor: '#ccc', mt: 2, borderRadius: '5px' }}>
                                            <Box sx={{ width: '2%', height: '100%', backgroundColor: 'green', borderRadius: '5px' }} />
                                        </Box>
                                        <Divider sx={{ my: 1 }} />
                                        <Grid container gap={'5px'} >
                                        <Button variant="outlined" color="success" sx={{ mr: 1 }}>Accept</Button>
                                        <Button variant="outlined" color="error" sx={{ mr: 1 }}>Reject</Button>
                                        <Button variant="outlined" >View Data</Button>
                                        </Grid>
                                    </Paper>
                                ))}
                            </Box>
                        </Grid>

                        {/* Progress Column */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', textAlign: 'center',color:'white',backgroundColor:'#8e8e8e',borderRadius:2, pb: 1,padding: '8px 16px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
                                In Progress
                            </Typography>
                            <Box sx={{ height: '60vh', overflowY: 'auto', padding: '8px', borderRadius: '8px'}}>
                                {applicationsData.slice(0, 6).map((app, index) => (
                                    <Paper elevation={3} key={index} sx={{ padding: 2, mb: 2, borderRadius: 2 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{app.name}</Typography>
                                        <Typography variant="body2">Role: {app.role}</Typography>
                                        <Typography variant="body2">Experience: {app.experience} years</Typography>
                                        <Typography variant="body2">Skills: {app.skills.join(', ')}</Typography>
                                        {/* Pipeline progress */}
                                        <Box sx={{ height: '5px', backgroundColor: '#ccc', mt: 2, borderRadius: '5px' }}>
                                            <Box sx={{ width: '50%', height: '100%', backgroundColor: 'green', borderRadius: '5px' }} />
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </Grid>

                        {/* Rejected Column */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center',color:'white',backgroundColor:'#d93939',borderRadius:2, pb: 1,padding: '8px 16px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
                                Rejected
                            </Typography>
                            <Box sx={{ height: '60vh', overflowY: 'auto', padding: '8px', borderRadius: '8px'}}>
                                {applicationsData.slice(0, 6).map((app, index) => (
                                    <Paper elevation={3} key={index} sx={{ padding: 2, mb: 2, borderRadius: 2 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{app.name}</Typography>
                                        <Typography variant="body2">Role: {app.role}</Typography>
                                        <Typography variant="body2">Experience: {app.experience} years</Typography>
                                        <Typography variant="body2">Skills: {app.skills.join(', ')}</Typography>
                                        <Box sx={{ height: '5px', backgroundColor: '#ccc', mt: 2, borderRadius: '5px' }}>
                                            <Box sx={{ width: '100%', height: '100%', backgroundColor: '#d93939', borderRadius: '5px' }} />
                                        </Box>
                                        <Divider sx={{ my: 1 }} />
                                        <Button variant="outlined" color="error">Rejected</Button>
                                    </Paper>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default SimpleCard;