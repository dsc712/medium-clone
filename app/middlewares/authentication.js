const  User  = require('../models/User');
const jwt = require('jsonwebtoken');
const verify = Promise.promisify(jwt.verify);

module.exports = secret => async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if(!token) {
            throw new Error('Unauthorized request, Please provide authorization token');
        }
        let payload;
        // console.log(token);
        try {
            payload = await verify(token, secret);
        } catch(err) {
            throw new Error("Authorization token is not valid");
        }
        user = await User.query().where("id", payload.sub );
        if(!user) {
            throw new Error("Invalid credential");
        }

        req.user = user;
        next();
    } catch(err) {
        res.status(401).send({ message: err.message });
    }
};
