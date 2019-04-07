const { Model } = require('objection');

class Clap extends Model {
    static get tableName() {
        return 'claps';
    }

    static get relationMappings() {
        const Story = require('./Story');
        const Clapper = require('./User');

        const clapper = {
            relation: Model.BelongsToOneRelation,
            modelCLass: Clapper,
            from: 'claps.clapper_id',
            to: 'users.id'
        };

        const story = {
            relation: Model.BelongsToOneRelation,
            modelCLass: Story,
            join: {
                from: 'claps.story_id',
                to: 'stories.id'
            }
        };

        return {
          clapper,
          story
        }
    }
}

module.exports = Clap;