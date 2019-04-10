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
        const s = await Story.query().where({ id: req.params.story }).first();
        let userClaps = await Clap.query().where({ clapper_id: req.user[0].id, story_id: s.id }).first();

        if( !userClaps ) {
            await Clap.query().insert({ count: Number(req.body.count), story_id: s.id, clapper_id: req.user[0].id });
            userClaps = await Clap.query().where({ clapper_id: req.user[0].id, story_id: s.id }).first();
            userClaps.count = 0;
            console.log("clapsjhjh", userClaps);
        } else {
            await Clap.query().patch({
                count: req.body.count
            }).where({
                clapper_id: req.user[0].id
            }).andWhere({
                story_id: s.id
            });
        }

        console.log("initial story claps", s.claps);
        console.log("initial no of claps of user", userClaps.count );
        console.log("final no of claps of user", req.body.count );
        const clapCount =  s.claps + ( req.body.count - userClaps.count );

        console.log( " clapCount",  clapCount );
        const story = await Story.query().patchAndFetchById(req.params.story, {
            claps: clapCount
        });

        return res.send({
            data: story
        })

    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};