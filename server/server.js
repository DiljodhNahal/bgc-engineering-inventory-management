const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const pino = require('express-pino-logger')()

const app = express()
require('dotenv').config()

const { Pool } = require('pg')

let pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(pino)
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'src/pages'))

