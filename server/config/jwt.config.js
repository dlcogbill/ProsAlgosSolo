const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const ADMIN_KEY = process.env.ADMIN_KEY;
const secret = process.env.SECRET_KEY;

module.exports.authenticate = async (req, res, next) => {
    try {
        const userPayLoad = jwt.verify(req.cookies.userToken,secret);
        const user = await User.findOne({ _id: userPayLoad._id });
        console.log(user.adminKey);
        console.log(user.userType);
        if ( user.adminKey !== ADMIN_KEY || user.userType !== 'Admin' ) {
            res.status(401).json({verified: false, error: err});
        }
        next();
    } catch (err) {
        res.status(401).json({verified: false, error: err});
    }
    
}