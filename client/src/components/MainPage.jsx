import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from '@mui/material';

function MainPage() {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url("https://th.bing.com/th/id/OIP.hJ84-xZdQ0HANnv5FnZ1VgHaD4?w=321&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")',
          height: '90vh',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            maxWidth: '500px',
            margin: '10px',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: {
                xs: '1.8rem',
                sm: '2.2rem',
                md: '2.8rem',
                lg: '3.2rem',
              },
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: {
                xs: '0.8rem',
                sm: '1.0rem',
                md: '1.2rem',
                lg: '1.5rem',
              },
            }}
          >
            "Where Talent Meets the Industry"
          </Typography>
          <Container>
            <Button variant="contained" sx={{ mt: 3, mr: 1 }}><a className="nav-link" href="/login">LOGIN</a></Button>
            <Button variant="contained" sx={{ mt: 3 }}>Sign Up</Button>
          </Container>
        </Box>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Job Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', minHeight: '200px' }}>
              <Typography variant="h5" gutterBottom>
                Job Placement
              </Typography>
              <Typography>
                We connect talented individuals with leading companies to ensure a perfect match for career growth.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', minHeight: '200px' }}>
              <Typography variant="h5" gutterBottom >
                Career Support
              </Typography>
              <Typography>
                Our expert team provides personalized career coaching and resume building to help you succeed.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', minHeight: '200px' }}>
              <Typography variant="h5" gutterBottom>
                Skills Development
              </Typography>
              <Typography>
                We offer workshops and training programs to enhance your skills and increase your employability.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MainPage;
