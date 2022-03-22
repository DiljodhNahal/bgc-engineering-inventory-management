/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    
    // For UUID's
    pgm.createExtension("uuid-ossp", {
        ifNotExists: true
    })
    // Create Requests Table
    pgm.createTable('requests', {
        id: { type: 'uuid', primaryKey: true, default: new PgLiteral('uuid_generate_v4()'), notNull: true },
        name: { type: 'varchar(255)', notNull: true },
        color: { type: 'varchar(20)', notNull: true },
        serialNumber: { type: 'varchar(255)' },
        price: { type: 'numeric(15, 6)' },
        purchaseDate: { type: 'date' },
        barcode: { type: 'varchar(255)', notNull: true },
        productCode: { type: 'numeric(15, 6)' },
        requestor: { type: 'varchar(255)', notNull: true},
        requestDate: { type: 'date'},
        returnDate: { type:'date'}
    })
};

exports.down = pgm => {};
