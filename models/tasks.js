const mongoose = require('mongoose');

// create schema 
const TaskSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name can not be empty."],
        maxlength: [50, 'First name is more than 50 characters.'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name can not be empty."],
        maxlength: [50, 'Last name is more than 50 characters.'],
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        default: "Not Comfortable"
    }
});

// exporting the model...
module.exports = mongoose.model('Task', TaskSchema);



