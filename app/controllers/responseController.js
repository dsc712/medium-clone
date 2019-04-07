const Response = require("../models/Response");

exports.add = async (req, res) => {
  try {
    const comment = await Response.query().insert({
      body: req.body.comment,
      story_id: req.body.storyId,
      created_by: req.body.loggedUserId
    });
    return res.send({ comment });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const comments = await Response.query();
    return res.send({ comments });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.find = async (req, res) => {
  try {
    const comments = await Response.query()
      .where({
        story_id: req.params.id
      })
      .orderBy("created_at", "ASC");
    return res.send({ comments });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
