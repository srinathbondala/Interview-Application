// import {  Paper, Box, Typography, Button} from '@mui/material';
// import ShowProfileCompletion from './ShowProfileCompletion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {useEffect, useState} from "react";
// function JobApplyPageRight({jobId}) {
//   const [areAllFieldsValid, setAreAllFieldsValid] = useState(false);
//   const [alreadyApplied, setAlreadyApplied] = useState(false);
//   const navigator = useNavigate();

//   useEffect(() => {
//     const userDetails = localStorage.getItem('Details');
//     if (userDetails) {
//       const userDetailsJson = JSON.parse(userDetails);
//       if (userDetailsJson.acadamicDetailsKey !==null && userDetailsJson.profactionalDetailsKey !==null) {
//         setAreAllFieldsValid(true);
//       }
//       userDetailsJson.jobApplicationKeys.forEach((jobApplicationKey) => {
//         if (jobApplicationKey == jobId) {
//           setAlreadyApplied(true);
//         }
//       });
//     }
//   }, []);
//   const applyJobByUser =async ()=>{
//       try {
//        if(confirm('Are you sure you want to apply for this job?')){
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//                 'Content-Type': 'application/json'
//             }
//         };

//         const response = await axios.post('http://localhost:8080/user/apply-job', { jobId }, config);
//         console.log('Job applied successfully:', response.data);
//         const userDetails = JSON.parse(localStorage.getItem('Details'));
//         userDetails.jobApplicationKeys.push(jobId);
//         localStorage.setItem('Details', JSON.stringify(userDetails));
//         alert(response.data.message);
//         navigator(-1);
//         return response.data;
//       }
//       } catch (error) {
//           console.log(error);
//           // console.error('Error applying for the job:', error.response ? error.response.data.error : error.message);
//           throw error;
//       }
//     }
//   return (
//     <Paper elevation={3} sx={{ p: 2 ,flexGrow: 1, bgcolor: 'white', minWidth: '200px',borderRadius: 1}}>
//         <Box sx={{textAlign:"center"}}>
//             <Typography variant="h6" align="center" gutterBottom> Apply For Job</Typography>
//             <hr />
//             {(areAllFieldsValid && !alreadyApplied) ? (<Button variant="contained" color="primary" fullWidth onClick={()=>{applyJobByUser(); }}>Apply</Button>) : (<>{alreadyApplied ?(<Typography variant="body1" align="center" sx={{color:"green"}} gutterBottom>Already Applied</Typography>):(<ShowProfileCompletion />) }</>)}   
//         </Box>
//     </Paper>
//   );
// }
// export default JobApplyPageRight;
import { Paper, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from '@mui/material';
import ShowProfileCompletion from './ShowProfileCompletion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function JobApplyPageRight({ jobId }) {
  const [areAllFieldsValid, setAreAllFieldsValid] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [status, setStatus] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('Details');
    if (userDetails) {
      const userDetailsJson = JSON.parse(userDetails);
      if (userDetailsJson.acadamicDetailsKey !== null && userDetailsJson.profactionalDetailsKey !== null) {
        setAreAllFieldsValid(true);
      }
      userDetailsJson.jobApplicationKeys.forEach((jobApplicationKey) => {
        if (jobApplicationKey === jobId) {
          setAlreadyApplied(true);
        }
      });
    }
  }, [jobId]);

  useEffect( () => {
    const fetchJobStatusDetails = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
          alert('User authentication has expired. Please log in again.');
          navigate('/login');
          return;
      }
      
      if (alreadyApplied) {
          try {
              const config = {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              };
              const response = await axios.get(`http://localhost:8080/user/get-job-status-details/${jobId}`, config);
              console.log('Job status details:', response.data);
              setStatus(response.data.jobApplication.status);
              setSuggestions(response.data.jobApplication.suggestions);
          } catch (err) {
              console.error('Error fetching job status details:', err);
          }
      }
  };

  fetchJobStatusDetails();
  }, [alreadyApplied]);

  const handleApplyJob = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('http://localhost:8080/user/apply-job', { jobId }, config);
      console.log('Job applied successfully:', response.data);
      const userDetails = JSON.parse(localStorage.getItem('Details'));
      userDetails.jobApplicationKeys.push(jobId);
      localStorage.setItem('Details', JSON.stringify(userDetails));
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      setAlreadyApplied(true);
      return response.data;
    } catch (error) {
      // console.error('Error applying for the job:', error.response ? error.response.data.error : error.message);
      setSnackbarMessage('Error applying for the job. Please try again.');
      setSnackbarOpen(true);
      throw error;
    }
  };

  const handleConfirmApply = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirm) => {
    if (confirm) {
      handleApplyJob();
    }
    setOpenDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, flexGrow: 1, bgcolor: 'white', minWidth: '200px', borderRadius: 1 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Apply For Job
        </Typography>
        <hr />
        {areAllFieldsValid && !alreadyApplied ? (
          <Button variant="contained" color="primary" fullWidth onClick={handleConfirmApply}>
            Apply
          </Button>
        ) : (
          <>
            {alreadyApplied ? (
              <Box>
                <Typography variant="body1" align="center" sx={{ color: 'green' }} gutterBottom>
                  Already Applied
                </Typography>
                <Typography variant="body2" align="center" sx={{ color: 'orange' }} gutterBottom>
                  Status: {status}
                </Typography>
                {suggestions && suggestions.length > 0 && (
                  <Box sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <Typography variant="body2" align="center" sx={{ color: 'red' }} gutterBottom>
                      Suggestions:
                    </Typography>
                    <Box component="ul" sx={{ padding: 0, listStyleType: 'none', textAlign: 'center' }}>
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>
                          <Typography variant="body2" color="textSecondary">
                            {index+1}. {suggestion.suggestion} - {new Date(suggestion.timestamp).toLocaleString()}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <ShowProfileCompletion />
            )}
          </>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => handleCloseDialog(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to apply for this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
}

export default JobApplyPageRight;
