import { Model } from 'objection';

class Response extends Model {
    static get tableName() {
        return 'responses';
    }

    static get relationMappings() {
        const Story = require('./Story');
        const story = {
            relation: Model.BelongsToOneRelation,
            modelClass: Story,
            from: 'responses.story_id',
            to: 'stories.id'
        };

        return {
            story
        }
    }
}

export default Response;