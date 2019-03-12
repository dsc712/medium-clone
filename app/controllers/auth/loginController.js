const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../configs');
const debug = require('debug')('app:controller:login');


const compare = (password, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
        if(err) {
            reject(err);
        } else {
            resolve(res);
        }
    })
});

const sign = user => jwt.sign({ sub: user.id, iat: Date.now() }, config.app.key);

exports.login = async (req, res) => {
    try {
        const user = await User.query().where('email', req.body.email ).first();
        if(!req.body.password || !user  ) {
            return res.status(422).send({ message: 'Username or Password is incorrect.' });
        }
        if(!user || !await compare(req.body.password, user.password)) {
            return res.status(422).send({ message: 'Username or Password is incorrect.' });
        }

        const token = sign(user);
        res.send({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });

    } catch(err) {
        debug(err);
        res.status(500).send({ message: err.message });
    }
};

