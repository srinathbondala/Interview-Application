import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid, Chip, MenuItem, IconButton,Snackbar } from '@mui/material';
import { AddCircleOutline, Cancel } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
const UserForm = () => {
  const location = useLocation()
  console.log(location.state)
  const userData = location.state.user || '';
  console.log(userData)

  const experienceRanges = ['0-1 years', '2-3 years', '3-5 years', '5+ years'];
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstname: userData.firstName || '',
    lastname: userData.lastName || '',
    email: userData.email || '',
    dob: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().substring(0, 10) : '',
    phonenumber: userData.phone || '',
    address: userData.address || '',
    college: userData.college || '',
    grade: userData.grade || '',
    branch: userData.branch || '',
    passedoutyear: userData.passedoutyear || '',
    role: userData.Role || '',
    skills: userData.skills || [],
    achievements: userData.achievements || '',
    resume: null,
    intermediate: '',
    intermediate_grade: '',
    intermediate_stream: '',
    intermediate_year: '',
    school: '',
    school_grade: '',
    school_year: '',
    experience: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
  const validateForm = () => {
    const { firstname, lastname, email, dob, phonenumber, college, grade, passedoutyear, role, achievements, experience, intermediate, intermediate_grade,
      intermediate_stream, intermediate_year, school, school_grade, school_year
    } = formData;
    let errorMessages = [];

    if (page === 0) {
      if (!firstname) errorMessages.push('Firstname is required.');
      if (!lastname) errorMessages.push('Lastname is required.');
      if (!email) errorMessages.push('Email is required.');
      if (!dob) errorMessages.push('Date of Birth is required.');
      if (!phonenumber) errorMessages.push('Phone number is required.');
      if (!formData.address) errorMessages.push('Address is required.');
    }

    else if (page === 1) {
      if (!college) errorMessages.push('College is required.');
      if (!grade) errorMessages.push('Grade is required.');
      if (!passedoutyear) errorMessages.push('Passing year is required.');
      if (!formData.branch) errorMessages.push('Branch is required.');
      if (!intermediate) errorMessages.push('intermediate is required.');
      if (!intermediate_grade) errorMessages.push('intermediate Grade is required.');
      if (!intermediate_year) errorMessages.push('intermediate Passing year is required.');
      if (!intermediate_stream) errorMessages.push('intermediate stream is required.');
      if (!school) errorMessages.push('school data is required.');
      if (!school_grade) errorMessages.push('school Grade is required.');
      if (!school_year) errorMessages.push('school Passing year is required.');
    }

    else if (page === 2) {
      if (!role) errorMessages.push('Role is required.');
      if (!achievements) errorMessages.push('Achievements are required.');
      if (!experience) errorMessages.push('Experience is required.');
      if (formData.skills.length === 0) errorMessages.push('At least one skill is required.');
    }

    return errorMessages.length > 0 ? errorMessages.join(' ') : null;
  };

  const handlePageChange = (direction) => {
    if(direction>0){
      
      const errorMessage = validateForm();
      if (errorMessage) {
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
        return;
      }
  
      // Log the current form data to the console
    }
    console.log("Current Form Data on Page Change:", formData);
    setPage((prev) => prev + direction);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      return;
    }

    // Log the form data to the console upon submission
    console.log("Submitted Form Data:", formData);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
          <TextField label="Intermediate (Class 12)" name="intermediate" value={formData.intermediate} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Stream" name="intermediate_stream" value={formData.intermediate_stream} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Grade" name="intermediate_grade" value={formData.intermediate_grade} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Passed year" name="intermediate_year" value={formData.intermediate_year} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="School (Class 10)" name="school" value={formData.school} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Grade" name="school_grade" value={formData.school_grade} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Passed year" name="school_year" value={formData.school_year} onChange={handleChange} fullWidth />
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

  const reviewProfile = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Review Your Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Personal Details</Typography>
          <Typography>Firstname: {formData.firstname}</Typography>
          <Typography>Lastname: {formData.lastname}</Typography>
          <Typography>Email: {formData.email}</Typography>
          <Typography>Address: {formData.address}</Typography>
          <Typography>Phone Number: {formData.phonenumber}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Academic Details</Typography>
          <Typography>College: {formData.college}</Typography>
          <Typography>Grade: {formData.grade}</Typography>
          <Typography>intermediate: {formData.intermediate}</Typography>
          <Typography>intermediate_grade: {formData.intermediate_grade}</Typography>
          <Typography>intermediate_stream: {formData.intermediate_stream}</Typography>
          <Typography>intermediate_year: {formData.intermediate_year}</Typography>
          <Typography>school: {formData.school}</Typography>
          <Typography>school_grade: {formData.school_grade}</Typography>
          <Typography>school_year: {formData.school_year}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Professional Details</Typography>
          <Typography>Role: {formData.role}</Typography>
          <Typography>Experiance: {formData.experience}</Typography>
          <Typography>Skills: {formData.skills}</Typography>
          <Typography>Achievements: {formData.achievements}</Typography>
          {formData.resume && <Typography>Resume: {formData.resume.name}</Typography>}
        </Grid>
      </Grid>
    </Box>
  );


  return (
    <Box sx={{ p: 3, backgroundColor: '#f7faff', borderRadius: 2, padding: 2, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        {page === 0 && renderPersonalDetails()}
        {page === 1 && renderAcademicDetails()}
        {page === 2 && renderProfessionalDetails()}
        {page === 3 && reviewProfile()}


        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {page > 0 && <Button variant="contained" onClick={() => handlePageChange(-1)}>Previous</Button>}
          {page < 3 ? (
            <Button variant="contained" onClick={() => handlePageChange(1)}>Next</Button>
          ) : (
            <Button variant="contained" type="submit">Submit</Button>
          )}
        </Box>
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

export default UserForm;