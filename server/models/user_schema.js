const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    acadamicDetailsKey: {
        type: Schema.Types.ObjectId,
        ref: 'Education',
        default: null
    },
    profactionalDetailsKey: {
        type: Schema.Types.ObjectId,
        ref: 'ProfessionalDetails',
        default: null
    },
    jobApplicationKeys: {
        type: [Schema.Types.ObjectId],
        ref: 'JobApplication',
        default: []
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);