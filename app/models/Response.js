const { Model } = require("objection");

class Response extends Model {
  $beforeInsert() {
    this.created_at = new Date();
  }
  static get tableName() {
    return "responses";
  }

  static get relationMappings() {
    const Story = require("./Story");
    const story = {
      relation: Model.BelongsToOneRelation,
      modelClass: Story,
      join: {
        from: "responses.story_id",
        to: "stories.id"
      }
    };

    return {
      story
    };
  }
}

module.exports = Response;
