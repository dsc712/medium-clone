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
}

module.exports = Story;