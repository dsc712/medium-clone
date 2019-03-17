import { Model } from 'objection';

class Publisher extends Model {
    static get tableName() {
        return 'publishers';
    }

    static get relationMappings() {
        const User = require('./User');
        const user = {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            from: 'publishers.user_id',
            to: 'users.id'
        };

        return {
            user
        }
    }
}

export default Publisher;