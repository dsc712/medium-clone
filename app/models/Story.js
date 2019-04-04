const { Model } = require("objection");

class Story extends Model {
    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static get tableName() {
        return "stories";
    }

    static get relationMappings() {

        const User = require("./User");
        const user = {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: "stories.writer_id",
                to: "users.id"
            }
        };

        return {
            user
        };
    }
}

module.exports = Story;