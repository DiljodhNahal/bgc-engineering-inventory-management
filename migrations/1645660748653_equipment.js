/* eslint-disable camelcase */
const { PgLiteral } = require('node-pg-migrate')

exports.shorthands = undefined

exports.up = pgm => {

    // For UUID's
    pgm.createExtension("uuid-ossp", {
        ifNotExists: true
    })
    // Create Equipment Table
    pgm.createTable('equipment', {
        id: { type: 'uuid', primaryKey: true, default: new PgLiteral('uuid_generate_v4()'), notNull: true },
        name: { type: 'varchar(255)', notNull: true },
        description: { type: 'text' },
        color: { type: 'varchar(20)', notNull: true },
        serialNumber: { type: 'varchar(255)' },
        price: { type: 'numeric(15, 6)' },
        purchaseDate: { type: 'date' },
        barcode: { type: 'varchar(255)', notNull: true }
    })


}
