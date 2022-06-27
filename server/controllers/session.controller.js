const Session = require('../models/session.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;

module.exports = {
//Controls for Session
    getSessions: (req, res) => {
        Session.find()
        .then((allSessions) => {
            res.json(allSessions);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in session:findAll', error: err });
        });
    },

    getSessionsByUser: (req, res) => {
        User.findOne({ userName: req.params.userName })
            .then((user) => {
                Session.find({ createdBy: user._id}).populate('createdBy', 'userName email')
                    .then((sessions) => {
                        res.json(sessions)
                    })
                    .catch((err) => {
                        res.status(400).json({ message: 'Something went wrong in session:findByUser', error: err });
                    })
            })
            .catch((err) => {
                res.status(400).json({ message: 'Something went wrong in user:findOne', error: err });
            })
    },

    createSession: (req, res) => {
        const user = jwt.verify(req.cookies.userToken, secret)
        Session.create({...req.body, createdBy: user._id})
        .then((newSession) => {
            res.json(newSession);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in session:create', error: err });
        });
    },

    getSessionById: (req, res) => {
        Session.findOne({ _id: req.params.id })
        .then((oneSession) => {
            res.json(oneSession);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in session:findById', error: err });
        });
    },

    deleteSession: (req, res) => {
        Session.deleteOne({ _id: req.params.id })
        .then((session) => {
            res.json(session);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in session:delete', error: err });
        });
    },

    updateSession: (req, res) => {
        Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedSession) => {
            res.json(updatedSession);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in session:update', error: err });
        });
    },
};