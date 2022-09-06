const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
    {
        sessionName: {
            type: String,
            required: [true, 'A name for the session is required!'],
            minlength: [3, 'The name must be at least 3 characters!'],
        },
        sessionType: {
            type: String,
            required: [true, 'A type for the session is required!'],
            enum: ['Photoshoot','Headshots','Event','Videography','Music Video','Other'],
        },
        status: {
            type: String,
            required: [true, 'A type for the session is required!'],
            enum: ['Submitted','Pending','Approved'],
        },
        desc: {
            type: String,
            required: [true, 'A description for the session is required!'],
            minlength: [3, 'The description must be at least 3 characters!'],
        },
        date: {
            type: Date,
            required: [true, 'A date for the session is required!'],
        },
        location: {
            type:  String,
            required: [true, 'A location is required!'],
        },
        locationName: {
            type: String,
            required: [true, 'A location name is required!'],
            minlength: [3, 'Location name must be at least 3 characters!'],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true
    }
);

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;