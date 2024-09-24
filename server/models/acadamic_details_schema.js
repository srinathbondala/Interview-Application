const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  education: {
    college: {
      type: String,
      default : ''
    },
    grade: {
      type: String,
      default: ''
    },
    passingYear: {
      type: Number,
      default: 0
    },
    branch: {
      type: String,
      default: ''
    }
  },
  intermediate: {
    institute: {
        type: String,
        default: ''
    },
    stream: {
      type: String,
      default: ''
    },
    grade: {
      type: String,
      default: ''
    },
    passedYear: {
      type: Number,
      default: 0
    }
  },
  school: {
    schoolName: {
        type: String,
        default: ''
    },
    grade: {
      type: String,
      default: ''
    },
    passedYear: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('Education', educationSchema);
