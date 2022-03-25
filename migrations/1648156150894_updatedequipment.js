/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

         // Create Equipment Table
         pgm.addColumns('equipment', {
            type: { type: 'varchar(255)'},
            category: { type: 'varchar(255)' },
            status: { type: 'varchar(255)' },
            productCode: { type: 'varchar(255)' },
            location: { type: 'varchar(255)' },
            projectNumber: { type: 'varchar(255)' },
            warrantyExpiryDate: { type: 'date' }
        });
 
    }
exports.down = pgm => {}
