import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Box, Divider } from '@mui/material';
function JobApplyPageLeft() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Uncomment and adjust the following code to fetch from your API
    // const fetchJobDetails = async () => {
    //   try {
    //     setLoading(true);
    //     const token = localStorage.getItem('jwtToken');
    //     const response = await fetch(`https://your-api-url/jobs/${jobId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch job details');
    //     }
    //     const data = await response.json();
    //     setJobDetails(data);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchJobDetails();
    setJobDetails({
      "jobId": 1,
      "role": "Software Development Engineer",
      "companyName": "Modak Analytics LLP",
      "employmentType": "Full Time",
      "location": "Hyderabad",
      "salaryRange": "INR 4,00,000 - INR 6,00,000",
      "experienceRange": "0-1 years",
      "description": "About the Position: We would be offering the position of “Software Development Engineer” for all the students who make it through our screening process. These young engineers who join us will go through a 90-day training programme developing their understanding of the organization, its business, various cutting-edge tools/technologies that we work on. On successful completion of training, these young engineers will be absorbed into either product or project teams as Full Time Employees (FTE).",
      "bondDetails": {
        "terms": "Selected aspirants will have to execute a bond in favour of Modak Analytics LLP for a minimum period of 3 years to undertake that he/she will serve the organisation further for at least 3 years from the date of joining."
      },
      "registrationEnded": "3 months ago",
      "eligibleCourses": [
        "B.Tech. - CSE - Cyber Security",
        "B.Tech. - Computer Science and Machine Learning",
        "B.Tech. - Electronics & Communication Engineering",
        "B.Tech. - CSE - Data Science",
        "B.Tech. - Information Technology",
        "B.Tech. - CSE - Artificial Intelligence & Machine Learning",
        "B.Tech. - Computer Science & Engineering"
      ],
      "eligibilityCriteria": {
        "streams": ["CSE", "ECE", "IT"],
        "percentage": "70% Throughout Academic",
        "rank": "EAMCET Rank – Below 10 K"
      },
      "selectionProcess": {
        "steps": [
          "Online Aptitude Test",
          "Online Technical Test / Coding Test",
          "Online English Language Test",
          "Final Interview"
        ],
        "note": "All the above screening tests will be computer-based tests & the test links will be sent at the personal email ids of students."
      }
    });
  }, [jobId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 2, width: '70%', bgcolor: 'white', flexGrow: 1, borderRadius: 1 }}>
      <Typography variant="h5">{jobDetails?.role}</Typography>
      <Typography variant="subtitle1">{jobDetails?.companyName}</Typography>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="body1"><strong>Location:</strong> {jobDetails?.location}</Typography>
        <Typography variant="body1"><strong>Employment Type:</strong> {jobDetails?.employmentType}</Typography>
        <Typography variant="body1"><strong>CTC:</strong> {jobDetails?.salaryRange}</Typography>
        <Typography variant="body1"><strong>Experience:</strong> {jobDetails?.experienceRange}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1"><strong>Description:</strong></Typography>
        <Typography variant="body2">{jobDetails?.description}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1"><strong>Bond Details:</strong> {jobDetails?.bondDetails?.terms}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1"><strong>Registration Ended:</strong> {jobDetails?.registrationEnded}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1"><strong>Eligible Courses:</strong></Typography>
        <Typography variant="body2">{jobDetails?.eligibleCourses.join(', ')}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1"><strong>Eligibility Criteria:</strong></Typography>
        <Typography variant="body2"><strong>Streams:</strong> {jobDetails?.eligibilityCriteria?.streams.join(', ')}</Typography>
        <Typography variant="body2"><strong>Percentage:</strong> {jobDetails?.eligibilityCriteria?.percentage}</Typography>
        <Typography variant="body2"><strong>Rank:</strong> {jobDetails?.eligibilityCriteria?.rank}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1"><strong>Selection Process:</strong></Typography>
        <Typography variant="body2">{jobDetails?.selectionProcess?.steps.join(', ')}</Typography>
        <Typography variant="body2"><em>{jobDetails?.selectionProcess?.note}</em></Typography>
      </Box>
    </Paper>
  );
}

export default JobApplyPageLeft;
