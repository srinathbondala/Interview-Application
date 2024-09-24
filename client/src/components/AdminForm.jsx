import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Chip, InputAdornment, IconButton, Grid } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddIcon from '@mui/icons-material/Add';
import { AddCircleOutline } from '@mui/icons-material';

const Form = () => {

    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');

    const handleAddSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput)) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };


    const handleDeleteSkill = (skillToDelete) => {
        setSkills(skills.filter(skill => skill !== skillToDelete));
    };

    // Experience and Salary range options
    const experienceRanges = ['0-1 years', '2-3 years', '3-5 years', '5+ years'];
    const salaryRanges = ['2-3 LPA', '4-5 LPA', '6-9 LPA', '10+ LPA'];

    return (
        <Box sx={{ mx: 'auto', mt: 4, backgroundColor: "#f7faff", borderRadius: 2, padding: 2 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', textTransform: 'uppercase', backdropFilter: 'blur', display: "flex", alignItems: "center" }} gutterBottom>
                New Application <NoteAddIcon />
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Company Name"
                        name="companyName"
                        fullWidth
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Role"
                        name="role"
                        fullWidth
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Location"
                        name="location"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        select
                        label="Experience"
                        name="experience"
                        fullWidth
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    >
                        {experienceRanges.map((range) => (
                            <MenuItem key={range} value={range}>
                                {range}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        select
                        label="Salary"
                        name="salary"
                        fullWidth
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    >
                        {salaryRanges.map((range) => (
                            <MenuItem key={range} value={range}>
                                {range}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} >
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center',mb:1 }}>
                            <TextField
                                label="Technical Skills"
                                name="skills"
                                fullWidth
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                            />
                            <IconButton onClick={handleAddSkill}>
                                <AddCircleOutline />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    onDelete={() => handleDeleteSkill(skill)}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <AddIcon /> ADD
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Form;
