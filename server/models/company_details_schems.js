const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bondDetailsSchema = new Schema({
  terms: { type: String, required: true },
});

const eligibilityCriteriaSchema = new Schema({
  streams: { type: [String], required: true },
  percentage: { type: String, required: true },
  rank: { type: String, required: true },
});

const selectionProcessSchema = new Schema({
  steps: { type: [String], required: true },
  note: { type: String, required: true },
});

const jobSchema = new Schema({
  jobId: { type: Number, required: true },
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  employmentType: { type: String, required: true },
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  experienceRange: { type: String, required: true },
  description: { type: String, required: true },
  bondDetails: { type: bondDetailsSchema, required: true },
  registrationEnded: { type: String, required: true },
  eligibleCourses: { type: [String], required: true },
  eligibilityCriteria: { type: eligibilityCriteriaSchema, required: true },
  selectionProcess: { type: selectionProcessSchema, required: true },
  companyType: { type: String, required: true },
});

module.exports = mongoose.model('Job', jobSchema);