const { Model } = require("objection");

class Story extends Model {
  static get tableName() {
    return "stories";
  }
}

module.exports = Story;
