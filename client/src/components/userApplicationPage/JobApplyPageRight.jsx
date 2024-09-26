import {  Paper, Box, Typography, Button} from '@mui/material';
import ShowProfileCompletion from './ShowProfileCompletion';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useEffect } from "react";
import { useNavigate } from 'react-router-dom';
function JobApplyPageRight({jobId}) {
  const navigation = useNavigate();
  const areAllFieldsValid = true;
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
        alert('authenticated id have expired. Please login again');
        navigation('/login');
    }
}, []);
  const applyJobByUser =async ()=>{
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('User is not authenticated');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post('http://localhost:8080/user/apply-job', { jobId }, config);
        console.log('Job applied successfully:', response.data);
        alert(response.data.message);
        navigation(-1);
        return response.data;
      } catch (error) {
          console.log(error);
          // console.error('Error applying for the job:', error.response ? error.response.data.error : error.message);
          throw error;
      }
    }
  return (
    <Paper elevation={3} sx={{ p: 2 ,flexGrow: 1, bgcolor: 'white', minWidth: '200px',borderRadius: 1}}>
        <Box sx={{textAlign:"center"}}>
            <Typography variant="h6" align="center" gutterBottom> Apply For Job</Typography>
            <hr />
            {areAllFieldsValid ? (<Button variant="contained" color="primary" fullWidth onClick={()=>{
              applyJobByUser(); 
            }}>Apply</Button>) : (<ShowProfileCompletion />) }   
        </Box>
    </Paper>
  );
}
export default JobApplyPageRight;