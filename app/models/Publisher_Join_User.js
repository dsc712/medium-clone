const { Model } = require("objection");

class Publisher_Join_User extends Model {
  static get tableName() {
    return "publisher_user";
  }
}

module.exports = Publisher_Join_User;
