import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Chip, InputAdornment,Snackbar, IconButton, Grid } from '@mui/material';
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
    const [bondDetails,setBondDetails]=useState('');
    const [selectionProccess,setSelectionProcess]=useState('');
    const [eligibilityCriteria,setEligibilityCriteria]=useState('');
    const [skillInput, setSkillInput] = useState('');
    const [employmenttype,setEmploymentType]=useState('');
    const [description, setDescription] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const validateForm = () => {
        if (!companyName) return 'Company Name is required';
        if (!role) return 'Role is required';
        if (!location) return 'Location is required';
        if (!experience) return 'Experience is required';
        if (!salary) return 'Salary is required';
        if (!description) return 'Description is required';
        if (!bondDetails) return 'bondDetails is required';
        if (!employmenttype) return 'Employment type is required';
        if (!eligibilityCriteria) return 'Eligibility Criteria is required';
        if (!selectionProccess) return 'Selection Proccess is required';
        if (skills.length === 0) return 'At least one skill is required';
        return null; 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
            return;
        }

        console.log({ companyName, role, experience, salary, location, skills });
        setCompanyName('');
        setRole('');
        setExperience('');
        setSalary('');
        setLocation('');
        setSkills([]);
        setDescription('');
        setSkillInput('');
        setBondDetails('');
        setEmploymentType('');
        setEligibilityCriteria('');
        setSelectionProcess('');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

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
    const employmentType=['Remote','Full Time','Part Time'];
    return (
        <Box sx={{ mx: 'auto', mt: 4, backgroundColor: "#f7faff", borderRadius: 2, padding: 2 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', textTransform: 'uppercase', backdropFilter: 'blur', display: "flex", alignItems: "center" }} gutterBottom>
                New Application <NoteAddIcon />
            </Typography>
            <form onSubmit={handleSubmit}>
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Bond Details"
                        name="bonddetails"
                        fullWidth
                        value={bondDetails}
                        onChange={(e) => setBondDetails(e.target.value)}
                    />
                </Grid>
             <Grid item xs={12} >
                    <TextField
                        select
                        label="Employment Type"
                        name="employmenttype"
                        fullWidth
                        value={employmenttype}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    >
                        {employmentType.map((range) => (
                            <MenuItem key={range} value={range}>
                                {range}
                            </MenuItem>
                        ))}
                    </TextField>
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
                <Grid item xs={12}>
                    <TextField
                        label="Eligibility Criteria"
                        name="eligibilityCriteria"
                        fullWidth
                        value={eligibilityCriteria}
                        onChange={(e) => setEligibilityCriteria(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Selection Process"
                        name="selectionprocess"
                        fullWidth
                        value={selectionProccess}
                        onChange={(e) => setSelectionProcess(e.target.value)}
                    />
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
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Form;
