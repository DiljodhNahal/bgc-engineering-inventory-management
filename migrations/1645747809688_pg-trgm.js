/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
    // Extension for SIMILARITY operator
    pgm.createExtension("pg_trgm", {
        ifNotExists: true
    })
}
