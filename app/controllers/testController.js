const TestModel = require('../models/TestModel');
const UserModel = require('../models/User');

exports.index = async (req, res) => {
    try {
        const test = await TestModel.query();
        res.send({data: test});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        const data = await TestModel.query().insert({
            name: req.body.name
        });
        res.send({data});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.query();
        // console.log(user)
        res.send({data: user});

    } catch (err) {
        res.status(500).send({data: err.message});
    }
};
