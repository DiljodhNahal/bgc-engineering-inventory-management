/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate')
exports.shorthands = undefined;


exports.up = pgm => {
    
    // For UUID's
    pgm.createExtension("uuid-ossp", {
        ifNotExists: true
    })
    // Create Requests Table
    pgm.createTable('requests', {
        id: { type: 'uuid', primaryKey: true, default: new PgLiteral('uuid_generate_v4()'), notNull: true },
        itemId: {type: 'uuid', notNull: true},
        name: { type: 'varchar(255)', notNull: true },
        requestor: { type: 'varchar(255)', notNull: true},
        requestDate: { type: 'date'},
        returnDate: { type:'date'},
        isAccepted: { type: 'boolean', default: false}
    })
};
