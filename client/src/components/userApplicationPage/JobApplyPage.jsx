import { Button, Container, Typography,Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import JobApplyPageRight from "./JobApplyPageRight";
import JobApplyPageLeft from "./JobApplyPageLeft";
function JobApplyPage (){
    const { jobId } = useParams();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    return(
        <>
        <Container sx={{minHeight:"80vh"}}>
            <Box sx={{ display: 'flex' }}>
                <Button variant="text" color="primary" onClick={handleBackClick}>
                    Go Back
                </Button>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Job Application
                </Typography>
                <hr />
                <Box sx={{display:"flex", flexWrap:"wrap",gap:"10px"}}>
                    <JobApplyPageLeft/>
                    <JobApplyPageRight/>
                </Box>
                {/* <Typography variant="body1" align="center" paragraph>
                    Application details for Job ID: {jobId}.
                </Typography> */}
            </Box>
        </Container>
        </>
    );
}
export default JobApplyPage;