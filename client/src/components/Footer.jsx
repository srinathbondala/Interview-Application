import { Box, Typography } from '@mui/material';
function Footer(){
    return (
        <Box
          sx={{
            backgroundColor: '#333',
            color: 'white',
            py: 3,
            mt: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant="body1">© 2024 Interview Track. All rights reserved.</Typography>
        </Box>
    );
}

export default Footer;