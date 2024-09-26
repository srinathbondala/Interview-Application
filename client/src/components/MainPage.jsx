import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from '@mui/material';
import { useGSAP } from '@gsap/react'

function MainPage() {
  useGSAP(() => {
    gsap.fromTo('#animated-box', { y: '100vh', opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
    gsap.fromTo('.btn', { y: '100', opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.25, delay: 1 });
  })

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(/imgs/MainPage.png)',
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
          id="animated-box"
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
            <Button className="btn" variant="contained" sx={{ mt: 3, mr: 1, '&:hover': { bgcolor: 'primary.main' } }}>
              <a className="nav-link" href="/login">LOGIN</a>
            </Button>
            <Button className="btn" variant="contained" sx={{ mt: 3, '&:hover': { bgcolor: 'primary.main' } }}>
              <a className="nav-link" href="/signup">SIGNUP</a>
            </Button>
          </Container>
        </Box>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Our Job Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', minHeight: '200px', background: `url('/imgs/bg3.png')`, backgroundPosition: 'center', backgroundSize: 'cover', color: 'white', fontWeight: 600 }}>
              <Typography variant="h4" gutterBottom>
                Job Placement
              </Typography>
              <Typography>
                We connect talented individuals with leading companies to ensure a perfect match for career growth.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', minHeight: '200px', background: `url('/imgs/bg2.png')`, backgroundPosition: 'center', backgroundSize: 'cover', color: 'whitesmoke', fontWeight: 600 }}>
              <Typography variant="h4" gutterBottom>
                Career Support
              </Typography>
              <Typography>
                Our expert team provides personalized career coaching and resume building to help you succeed.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} sx={{ padding: 4, textAlign: 'center', minHeight: '200px', background: `url('/imgs/bg1.png')`, backgroundPosition: 'center', backgroundSize: 'cover', fontWeight: 600, color: 'white' }}>
              <Typography variant="h4" gutterBottom>
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
