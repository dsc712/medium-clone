const { Model } = require('objection');
const Knex = require('knex');
const config = require('../../configs/database');
const debug = require('debug')('app:knex:query');

// Initialize knex.
const knex = Knex({
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        host : config.host,
        port : config.port,
        user : config.username,
        password : config.password,
        database : config.database
    }
});

Model.knex(knex);
exports.db = knex;
