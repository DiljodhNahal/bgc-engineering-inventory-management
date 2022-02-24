const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const pino = require('express-pino-logger')()

const app = express()

const { Pool } = require('pg')

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views', path.join(__dirname, 'src/pages'))
app.set('view engine', 'ejs')

// Endpoints


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)