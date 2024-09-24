import {  Paper, Box, Typography, Button} from '@mui/material';
import ShowProfileCompletion from './ShowProfileCompletion';
function JobApplyPageRight() {
    const areAllFieldsValid = true;
  return (
    <Paper elevation={3} sx={{ p: 2 ,flexGrow: 1, bgcolor: 'white', minWidth: '200px',borderRadius: 1}}>
        <Box sx={{textAlign:"center"}}>
            <Typography variant="h6" align="center" gutterBottom> Apply For Job</Typography>
            <hr />
            {areAllFieldsValid ? (<Button variant="contained" color="primary" fullWidth>Apply</Button>) : (<ShowProfileCompletion />) }   
        </Box>
    </Paper>
  );
}
export default JobApplyPageRight;