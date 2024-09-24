import { Box, Typography } from '@mui/material';
function Footer(){
    return (
        <Box
          sx={{
            backgroundColor: '#333',
            color: 'white',
            textAlign: 'center',
            marginTop:'1.5rem',
            p:2,
            flexGrow: '1',
            width: '100%',
          }}
        >
          <Typography variant="body1">© 2024 Interview Track. All rights reserved.</Typography>
        </Box>
    );
}

export default Footer;