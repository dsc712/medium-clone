import { Model } from "objection";

class Publisher extends Model {
  static get tableName() {
    return "publishers";
  }

  static get relationMappings() {
    const User = require("./User");
    const Publisher_Join_User = require('./Publisher_Join_User')
    const user = {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "publishers.user_id",
        through:{
          from:'Publisher_Join_User.publisherID',
          to:'Publisher_Join_User.userID',
          modelClass:Publisher_Join_User
        },
        to: "users.id"
      }
    };

    return {
      user
    };
  }
}

export default Publisher;
