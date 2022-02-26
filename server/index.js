const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const pino = require('express-pino-logger')()

require('dotenv').config()
const app = express()

const { Pool } = require('pg')

let pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views', path.join(__dirname, 'src/pages'))

// Global Error Handling
const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
}

// Endpoints
app.get('/api/search', asyncHandler(async (req, res, next) => {

    try {
        // Build SQL String
        let queryString = `SELECT * FROM equipment`
        let queries = 0

        const updateString = (key, value) => {

            // Add Operators To Query String Dependant On Position
            if (queries === 0) {
                queryString += ' WHERE'
            } else {
                queryString += ' AND'
            }

            // Search or Filter Depending On key
            if (key === 'name') {
                queryString += ` SIMILARITY(name, '${value}') > 0.4`
            } else {
                // Add Key To Query String
                if (key === 'id') {
                    queryString += ` ${key} =`
                } else {
                    queryString += ` ${key} ilike`
                }

                // Add Value To Query String
                if (Number.isInteger(value)) {
                    queryString += ` ${value}`
                } else {
                    queryString += ` '${value}'`
                }
            }

            queries += 1
        }

        // Filters
        for (let key in req.query)
            updateString(key, req.query[key])

        // Query Results
        let results = await pool.query(queryString)

        // Build Response
        let response = {count: results.rowCount, results: results.rows}

        res.send(response)
    } catch (exception) {
        throw new Error(exception.message)
    }

}))


// Global Error Handling
app.use(function (err, req, res, next) {
    res.status(500).send(err.message)
})


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)