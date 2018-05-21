const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Profile Scheme down here
const ProfileSchema = new Schema({
    user: {                             // Binding the User Details here
        type: Schema.Types.ObjectId,
        ref: 'users'                    // Refernce
    },
    handle: {                           // Route for user Profile Page
        type: String,
        required: true,
        max: 40, 
    },
    company: {                          // Company Name (optional)
        type: String
    },
    website: {                          // Domain Name of the User (optional)
        type: String
    },
    location: {                         // Current Location (optional)
        type: String
    },
    status: {                           // Role of the User
        type: String,                   // Ex: Developer, Junior Developer, Senior Software
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String                     // Optional Description
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            fromDate: {
                type: Date,
                required: true
            },
            toDate: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            skillsUsed: {
                type: [String]
            }
        }
    ],
    education: [
        {
            instituteName: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String,
                required: true
            },
            fromDate: {
                type: Date
            },
            toDate: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);