const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalDetailsSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    interestedRole: {
      type: String,
      default: '',
    },
    skills: {
      type: [String], 
      default: [],
    },
    experience: {
      type: String, 
      default: 0,
    },
    achievements: {
      type: [String], 
      default: [],
    },
  });

  module.exports = mongoose.model('ProfessionalDetails', professionalDetailsSchema);