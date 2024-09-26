import { Paper, Grid, Container, Box } from "@mui/material";
import SimpleCard from "./AdminCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Form from "./AdminForm"; // Import your form component

// const data = [
//     {
//         companyName: "wipro",
//         role: "Backend",
//         experienceRange: "2-3 yrs",
//         technicalSkills: ["C", "C++", "Java"],
//         salaryRange:"6-7 Lpa",
//         description:"hey there",
//     },
//     {
//         companyName: "infosys",
//         role: "Frontend",
//         experienceRange: "1-2 yrs",
//         technicalSkills: ["React", "JavaScript", "HTML"],
//         description:"hey there",
//         salaryRange:"6-7 Lpa",


//     },
//     {
//         companyName: "tcs",
//         role: "Fullstack",
//         experienceRange: "5-8 yrs",
//         technicalSkills: ["Node.js", "React", "MongoDB"],
//         description:"hey there",
//         salaryRange:"6-7 Lpa",

//     },
//     {
//         companyName: "wipro",
//         role: "Backend",
//         experienceRange: "2-3 yrs",
//         technicalSkills: ["C", "C++", "Java"],
//         salaryRange:"6-7 Lpa",
//         description:"hey there",
//     },
//     {
//         companyName: "infosys",
//         role: "Frontend",
//         experienceRange: "1-2 yrs",
//         technicalSkills: ["React", "JavaScript", "HTML"],
//         description:"hey there",
//         salaryRange:"6-7 Lpa",


//     },
//     {
//         companyName: "tcs",
//         role: "Fullstack",
//         experienceRange: "5-8 yrs",
//         technicalSkills: ["Node.js", "React", "MongoDB"],
//         description:"hey there",
//         salaryRange:"6-7 Lpa",

//     }
// ];

const MainBody = () => {
    const navigation = useNavigate();
    if(localStorage.getItem('userType')!=="admin"|| !localStorage.getItem('jwtToken'))
    {
        navigation('/');
    }
    const [data,setData]=useState([]);
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('authenticated id have expired. Please login again');
            navigation('/login');
        }
        axios.get('http://localhost:8080/auth/top-company').then(
            response => {
                setData(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
    }, []);

    return (
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
                                <SimpleCard {...item._id} />
                            {/* </Paper> */}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default MainBody;
