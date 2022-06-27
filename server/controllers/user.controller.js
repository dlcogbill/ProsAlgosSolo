const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const secret = process.env.SECRET_KEY;
const ADMIN_KEY = process.env.ADMIN_KEY;

const register = async (req,res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        console.log('NEW USER', newUser);
        const userToken = jwt.sign({
            _id: newUser._id,
            email: newUser.email,
            userName: newUser.userName,
        }, secret );
        res
            .status(201)
            .cookie('userToken', userToken, {
                expires: new Date(Date.now() + 1000000),
            })
            .json({
                successMessage: 'user created',
                user: {
                    id: newUser._id,
                    userName: newUser.userName,
                    email: newUser.email,
                    userType: newUser.userType,
                },
            })
    } catch(err) {
        res
            .status(400)
            .json({
                message: 'Something went wrong in register',
                error: err
            });
    }
};

const adminRegister = async (req,res) => {
    try {
        const user = new User(req.body);
        
        if ( req.body.userType !== 'Admin' || req.body.adminKey !== ADMIN_KEY ) {
            res
            .status(400).json({ message: 'Something went wrong in admin register' });
        }
        const newUser = await user.save();
        const userToken = jwt.sign({
            _id: newUser._id,
            email: newUser.email,
            userName: newUser.userName,
        }, secret );
        res
            .status(201)
            .cookie('userToken', userToken, {
                expires: new Date(Date.now() + 1000000),
            })
            .json({
                successMessage: 'user created',
                user: {
                    id: newUser._id,
                    userName: newUser.userName,
                    email: newUser.email,
                    userType: newUser.userType,
                },
            })
    } catch(err) {
        res
            .status(400)
            .json({
                message: 'Something went wrong in admin register',
                error: err
            });
    }
};

const login = async (req, res) => {
    const userDoc = await User.findOne({ email: req.body.email});
    if (!userDoc) {
        res.status(400).json({ message: 'Invalid Login'});
    } else {
        try {
            const isPasswordValid = bcrypt.compare(req.body.password,userDoc.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Invalid Login'});
            } else {
                const userToken = jwt.sign({
                    _id: userDoc._id,
                    email: userDoc.email,
                    userName: userDoc.userName,
                    userType: userDoc.userType,
                }, secret );
                res
                    .cookie('userToken', userToken, {
                        expires: new Date(Date.now() + 1000000),
                    })
                    .json({
                        successMessage: 'user logged in',
                        user: {
                            _id: userDoc._id,
                            email: userDoc.email,
                            userName: userDoc.userName,
                            userType: userDoc.userType,
                        },
                    });
            }
        } catch(err) {
            res.status(400).json({ message: 'Invalid Login'});
        }
    }
};

const adminLogin = async (req, res) => {
    const userDoc = await User.findOne({ email: req.body.email});
    if (!userDoc) {
        res.status(400).json({ message: 'Invalid Login'});
    } else {
        try {
            const isPasswordValid = bcrypt.compare(req.body.password,userDoc.password);
            const isAdmin = false;
            
            if (!isPasswordValid || req.body.userType !== 'Admin' || req.body.adminKey !== ADMIN_KEY) {
                res.status(400).json({ message: 'Invalid Login'});
            } else {
                const userToken = jwt.sign({
                    _id: userDoc._id,
                    email: userDoc.email,
                    userName: userDoc.userName,
                    userType: userDoc.userType,
                }, secret );
                res
                    .cookie('userToken', userToken, {
                        expires: new Date(Date.now() + 1000000),
                    })
                    .json({
                        successMessage: 'user logged in',
                        user: {
                            _id: userDoc._id,
                            email: userDoc.email,
                            userName: userDoc.userName,
                            userType: userDoc.userType,
                        },
                    });
            }
        } catch(err) {
            res.status(400).json({ message: 'Invalid Login'});
        }
    }
};

const logout = (req, res) => {
    res.clearCookie('userToken');
    res.json({ message: 'You are logged out' });
};

const getLoggedInUser = async (req, res) => {
    try {
        const userPayLoad = jwt.verify(req.cookies.userToken,secret)
        console.log('USER', userPayLoad);
        const user = await User.findOne({ _id: userPayLoad._id });
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                userType: user.userType,
            }
        })
    } catch(err) {
        res.status(400).json({ message: 'Invalid Login'})
    }
};

const getUsers = async (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json(allUsers);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in user:findAll', error: err });
        });
}

const deleteUser = async (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((user) => {
            console.log('DELETE:', user);
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in user:delete', error: err });
        });
}

module.exports = { //Controls for User
    register,
    login,
    logout,
    getLoggedInUser,
    getUsers,
    adminLogin,
    adminRegister,
    deleteUser,
};