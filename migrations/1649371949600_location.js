/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate')

exports.shorthands = undefined;

exports.up = pgm => {
    // Create Locations Table
    pgm.createTable('locations', {
        id: { type: 'uuid', primaryKey: true, default: new PgLiteral('uuid_generate_v4()'), notNull: true },
        name: { type: 'varchar(255)' },
        address: { type: 'varchar(255)' }
    })

    // Edit Users Table
    pgm.addColumns('users', {
        location: { type: 'uuid', notNull: false, references: '"users"', onDelete: 'set null' },
    });

};

