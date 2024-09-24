const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  jobId: { type: Number, required: true },
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  employmentType: { type: String, required: true },
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  experienceRange: { type: String, required: true },
  description: { type: String, required: true },
  bondDetails: { type: String, required: true },
  technicalSkills: { type: [String], required: true },
  registrationEnded: { type: String, required: true },
  eligibilityCriteria: { type: String, required: true },
  selectionProcess: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);