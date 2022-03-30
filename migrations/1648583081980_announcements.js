/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate')

exports.shorthands = undefined;

exports.up = pgm => {
    // Create Users Table
    pgm.createTable('announcements', {
        id: { type: 'uuid', primaryKey: true, default: new PgLiteral('uuid_generate_v4()'), notNull: true },
        announcement: { type: 'text' },
});

}