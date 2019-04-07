const Clap = require('../models/Clap');
const Story = require('../models/Story');

exports.index = async ( req, res ) => {
    try {
        const claps = await Clap.query().where({ story_id: req.params.story}).andWhere({ clapper_id: req.user[0].id }).first();
        return res.send({ claps });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.update = async (req, res ) => {
    try {
        const story = await Story.query().patchAndFetchById(req.params.story, {
            claps: req.body.totalCount
        });

        await Clap.query().delete().where({ clapper_id: req.user[0].id });
        const claps = await Clap.query().insert({
            count: req.body.count,
            story_id: req.params.story,
            clapper_id: req.user[0].id
        });

        return res.send({
            data: story
        })

    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};