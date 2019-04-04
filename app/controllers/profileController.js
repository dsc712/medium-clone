const User = require('../../app/models/User');
exports.me = async ( req, res ) => {
    return res.send({ ...req.user[0].toJSON() });
};

exports.update = async ( req, res ) => {
    try {
        const data = await User.query().patch({
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo
        }).where({ id: req.params.user });

        return res.send({
            data,
            message: "Profile updated successfully"
        })
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};