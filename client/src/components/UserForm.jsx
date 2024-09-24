import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid, Chip, MenuItem, IconButton } from '@mui/material';
import { AddCircleOutline, Cancel } from '@mui/icons-material';

const UserForm = () => {
  const experienceRanges = ['0-1 years', '2-3 years', '3-5 years', '5+ years'];
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    phonenumber: '',
    address: '',
    college: '',
    grade: '',
    branch: '',
    passedoutyear: '',
    role: '',
    skills: [],
    achievements: '',
    resume: null,
  });

  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput)) {
      setFormData((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, skillInput],
      }));
    }
    setSkillInput('');
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderPersonalDetails = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Personal Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Firstname" name="firstname" fullWidth value={formData.firstname} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Lastname" name="lastname" fullWidth value={formData.lastname} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" fullWidth value={formData.email} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Date of Birth" fullWidth type="date" name="dob" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Phone number" name="phonenumber" fullWidth value={formData.phonenumber} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" multiline rows={4} name="address" fullWidth value={formData.address} onChange={handleChange} />
        </Grid>
      </Grid>
    </Box>
  );

  const renderAcademicDetails = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Education</Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField label="College" name="college" fullWidth value={formData.college} onChange={handleChange} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Grade" name="grade" fullWidth value={formData.grade} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Passing year" name="passedoutyear" fullWidth value={formData.passedoutyear} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Branch" name="branch" fullWidth value={formData.branch} onChange={handleChange} />
        </Grid>
        {/* Intermediate and School Fields */}
        <Grid item xs={12}>
          <TextField label="Intermediate (Class 12)" name="intermediate" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Stream" name="intermediate_stream" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Grade" name="intermediate_grade" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Passed year" name="intermediate_year" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="School (Class 10)" name="school" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Grade" name="school_grade" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Passed year" name="school_year" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );

  const renderProfessionalDetails = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Professional Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Interested role" name="role" fullWidth value={formData.role} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                fullWidth
              />
              <IconButton onClick={handleAddSkill}>
                <AddCircleOutline />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.skills.map((skill, index) => (
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
            select
            label="Experience"
            name="experience"
            fullWidth
            value={formData.experience}
            onChange={handleChange}
          >
            {experienceRanges.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Achievements" name="achievements" fullWidth value={formData.achievements} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth component="label">
            Upload Resume
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {formData.resume && <Typography variant="body2" sx={{ mt: 1 }}>{formData.resume.name}</Typography>}
        </Grid>
      </Grid>
    </Box>
  );

  return (
    // sx={{ maxWidth: 400, mx: 'auto', mt: 4, backgroundColor: "#f7faff", borderRadius: 2, padding: 2 }
    <Box sx={{ p: 3, backgroundColor: '#f7faff', borderRadius: 2, padding: 2, mx: 'auto', mt: 4, }} >
      <form onSubmit={handleSubmit}>
        {page === 0 && renderPersonalDetails()}
        {page === 1 && renderAcademicDetails()}
        {page === 2 && renderProfessionalDetails()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {page > 0 && <Button variant="contained" onClick={prevPage}>Previous</Button>}
          {page < 2 ? (
            <Button variant="contained" onClick={nextPage}>Next</Button>
          ) : (
            <Button variant="contained" type="submit">Submit</Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default UserForm;
