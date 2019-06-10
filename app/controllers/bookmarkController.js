const Bookmark = require('../models/Bookmark');

exports.me = async (req, res) => {
    return res.send({...req.user[0].toJSON()});
};
//delete, add, getMyBookList, is bookmarked(find)

exports.getMyBookList = async (req, res) => {
    try {
        // const data = await Bookmark.query().where('user_id',req.params.userid);
        const userObj = {...req.user[0].toJSON()};
        const data = await Bookmark.query().where('user_id', userObj.id);

        return res.send({
            data,
            message: "Data sent successfully"
        })
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.find = async (req, res) => {
    try {
        const userObj = {...req.user[0].toJSON()};
        const data = await Bookmark.query()
            .where({ article_id: req.params.articleid })
            .andWhere({user_id: userObj.id});

        console.log("bookmark",data);
        return res.send({
            data,
            total: data.length,
            message: "Data sent successfully"
        })
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.add = async (req, res) => {
    try {
        const userObj = {...req.user[0].toJSON()};

        const data = await Bookmark.query().insert({
            article_id: req.params.articleid,
            user_id: userObj.id
        });

        return res.send({
            data: data,
            message: "Bookmark added successfully"
        })
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.remove = async (req, res) => {
    try {
        const userObj = {...req.user[0].toJSON()};
        const data = await Bookmark.query().delete()
            .where({article_id: req.params.articleid})
            .andWhere({user_id: userObj.id});

        return res.send({
            data,
            message: "Bookmark deleted successfully"
        })
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};