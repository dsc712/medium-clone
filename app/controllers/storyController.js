const stories = require("../models/Story");

exports.stories = async (req, res) => {
  try {
    const story = await stories
      .query()
      .page(Number(req.query.page), Number(req.query.count)); 
    res.send({ data: story });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};
