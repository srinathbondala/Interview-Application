const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobApplicationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    resume: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Applied'
    },
    comments: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        comment: {
            type: String,
            required: true
        }
    }],
    suggestions: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        suggestion: {
            type: String,
            required: true
        }
    }],
    latestChangesBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    latestChangesAt: {
        type: Date,
        default: Date.now
    },
    sheduledDateTime: {
        type: [Date],
        default: []
    },
});
module.exports = mongoose.model('JobApplication', jobApplicationSchema);