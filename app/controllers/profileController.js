exports.me = async ( req, res ) => {
    return res.send({ ...req.user });
};