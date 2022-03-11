require('dotenv').config()

const { Pool } = require('pg')

let pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

if (process.env.NODE_ENV === 'production') {
    pool.ssl = {rejectUnauthorized: false}
} else {
    pool.ssl = false
}

module.exports = pool