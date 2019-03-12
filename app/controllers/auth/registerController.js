const User = require('../../models/User');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:controller:register');
const config = require('../../../configs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const sign = user => jwt.sign({ sub: user.id, iat: Date.now() }, config.app.key);

const hash = password => new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
                reject(err);
            }
            resolve(hash);
        })
    })
});

const validate = async data => {
    if(!data.email ||!validator.isEmail(data.email)) {
        throw new Error('Please enter a valid email!');
    }

    console.log("users", await User.query().where('email', data.email));
    const users = await User.query().where('email', data.email);
    if( users.length !== 0 ) {
        throw new Error('Seems like your email already exists!');
    }

};

exports.register = async (req, res) => {
    try {
        await validate(req.body);
    } catch(err) {
        return res.status(422).send({message: err.message});
    }

    try {
        const user = await User.query().insert({
            name: req.body.name,
            email: req.body.email,
            password: await hash(req.body.password),
        });
        const token = sign(user);
        res.send({
            user, token
        });
    } catch(err) {
        debug(err);
        res.status(500).send({ message: err.message });
    }
};

