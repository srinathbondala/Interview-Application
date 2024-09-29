import { Paper, Grid, Container, Box, Typography, Button, TextField } from "@mui/material";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import useToken from "../useToken";

const UserContent = ({ islogged }) => {
    const { token } = useToken();
    useGSAP(() => {
        gsap.fromTo('.card', { y: '440', opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.25, delay: 0.5 });
    });

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/auth/top-company')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = data.filter(item =>
            item._id.companyName.toLowerCase().includes(query)
        );
        console.log(filtered);
        setFilteredData(filtered);
    };

    return (
        <>
            <Typography variant="h4" align="center">
                Top Companies
            </Typography>

            <Container sx={{ marginTop: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search by company name or role"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 3 }}
                />
            </Container>

            <Container sx={{ marginTop: 2, flexWrap: "wrap" }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        gap: '1rem',
                    }}
                >
                    <Grid container spacing={2}>
                        {filteredData.map((item, index) => (
                            <Grid item xs={12} sm={6} md={6} key={index}>
                                <UserCard {...item._id} islogged={islogged} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {token ? (
                        <Button variant="outlined" sx={{ mt: 3, mr: 1 }} component="a" href="/user/all">
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
