const Story = require("../models/Story");

exports.stories = async (req, res) => {
  try {
    const story = await Story
      .query()
      .page(Number(req.query.page) || 0, Number(req.query.count) || 5);
    res.send({ data: story });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.find = async (req, res ) => {
  try {
    const story = await Story.query().where({ id: req.params.story}).first();
    return res.send({ story });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.userStories = async (req,res) => {
  try {
    const stories = await Story.query().where({ writer_id: req.params.user });
    return res.send({ stories })
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const story = await Story.query().insert({
      title: req.body.title,
      featured_image: req.body.featured_image,
      body: req.body.story,
      writer_id: req.user[0].id
    });

    return res.send({ story });
  } catch(err) {
      res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const story = Story.query().patch({
      title: req.body.title,
      featured_image: req.body.featured_image,
      body: req.body.story,
    }).where({
      writer_id: req.user[0].id,
      id: req.params.story
    });

    return res.send({ story });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.destroy = async (req, res ) => {
  try {
    const story = await Story.query().delete().where({ writer_id: req.params.user }).andWhere({ id: req.params.story });
    return res.send({ story, message: "Story deleted successfully"});
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};