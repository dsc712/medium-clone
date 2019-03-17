import { Model } from 'objection';

class Story extends Model {
    static get tableName() {
        return 'stories'
    }

    static get relationMappings() {
        const Writer = require('./User');
        const Publisher = require('./Publisher');

        const writer = {
            relation: Model.BelongsToOneRelation,
            modelClass: Writer,
            join: {
                from: 'stories.writer_id',
                to: 'users.id'
            }
        };

        const publisher = {
          relation: Model.BelongsToOneRelation,
          modelClass: Publisher,
          join: {
              from: 'stories.publisher_id',
              to: 'publishers.id'
          }
        };

        return {
          writer,
          publisher
        }
    }
}
export default Story;