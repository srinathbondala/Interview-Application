import { Paper, Grid, Container, Box,Pagination,Typography, Button } from "@mui/material";
import UserCard from "./UserCard";

const data = [
    {
        jobId: 1,
        companyName: "wipro",
        role: "Backend",
        experienceRange: "2-3 yrs",
        technicalSkills: ["C", "C++", "Java"],
        salaryRange:"6-7 Lpa",
        description:"hey there",
    },
    {
        jobId: 2,
        companyName: "infosys",
        role: "Frontend",
        experienceRange: "1-2 yrs",
        technicalSkills: ["React", "JavaScript", "HTML"],
        description:"hey there",
        salaryRange:"6-7 Lpa",


    },
    {
        jobId: 3,
        companyName: "tcs",
        role: "Fullstack",
        experienceRange: "5-8 yrs",
        technicalSkills: ["Node.js", "React", "MongoDB"],
        description:"hey there",
        salaryRange:"6-7 Lpa",

    },
    {
        jobId: 4,
        companyName: "wipro",
        role: "Backend",
        experienceRange: "2-3 yrs",
        technicalSkills: ["C", "C++", "Java"],
        salaryRange:"6-7 Lpa",
        description:"hey there",
    },
    {
        jobId: 5,
        companyName: "infosys",
        role: "Frontend",
        experienceRange: "1-2 yrs",
        technicalSkills: ["React", "JavaScript", "HTML"],
        description:"hey there",
        salaryRange:"6-7 Lpa",


    },
    {
        jobId: 6,
        companyName: "tcs",
        role: "Fullstack",
        experienceRange: "5-8 yrs",
        technicalSkills: ["Node.js", "React", "MongoDB"],
        description:"hey there",
        salaryRange:"6-7 Lpa",

    }
];

const UserContent = ({islogged}) => {
    return (
        <>
            <Typography variant="h4" align="center">
               Top Companies
            </Typography>
            <Container sx={{ marginTop: 2 ,flexWrap:"wrap" }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        gap: '1rem',
                    }}
                >
                    {/* Cards Section */}
                    <Grid container spacing={2}>
                        {data.map((item, index) => (
                            <Grid item xs={12} sm={6} md={6} key={index}>
                                {/* <Paper elevation={3}> */}
                                    <UserCard {...item} islogged={islogged} />
                                {/* </Paper> */}
                            </Grid>
                        ))}
                        {/* <Pagination count={10} color="primary" /> */}
                    </Grid>
                </Box>
                <Container sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                {islogged ? (
                        <Button variant="outlined" sx={{ mt: 3, mr: 1 }} component="a" href="/">
                            View all companies
                        </Button>
                    ) : (
                        <Button variant="outlined" sx={{ mt: 3, mr: 1 }} component="a" href="/login">
                            View all companies
                        </Button>
                    )}
                </Container>
            </Container>
        </>
    );
};

export default UserContent;
