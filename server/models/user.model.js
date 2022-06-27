const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'User name is required!'],
            minlength: [3, 'User name must be at least 3 characters!'],
        },
        userType: {
            type: String,
            required: [true, 'User type is required!'],
            enum: ['User','Admin'],
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minlength: [8, 'Password must be at least 8 characters!'],
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            unique: true,
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email",
            }
        },
        adminKey: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

UserSchema.virtual('_confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('_confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
});

UserSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});



const User = mongoose.model('User', UserSchema);

module.exports = User;