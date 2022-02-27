/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate')

exports.shorthands = undefined;

exports.up = pgm => {
    // Create Users Table
    pgm.createTable('users', {
        id: { type: 'uuid', primaryKey: true, default: new PgLiteral('uuid_generate_v4()'), notNull: true },
        email: { type: 'varchar(255)' },
        password: { type: 'varchar(255)' },
        accountType: { type: 'int' }
    })
};

