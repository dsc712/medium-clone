const TestModel  = require('../models/TestModel');

exports.index = async ( req, res ) => {
    try {
        const test = await TestModel.query();
        res.send({ data: test });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};
