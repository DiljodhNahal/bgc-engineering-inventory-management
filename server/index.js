const express = require('express')
const pool = require('./db')
const bodyParser = require('body-parser')
const path = require('path')
const pino = require('express-pino-logger')()
const bcrypt = require("bcrypt")
const passport = require("passport");
const initializePassport = require('./loginConfig')
const session = require('express-session')
const { Cookie } = require('express-session')

require('dotenv').config()

const app = express()

//import pool from './db'

initializePassport(passport)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views', path.join(__dirname, 'src/pages'))

app.use(
    session({
        secret: 'hidden',
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

// Global Error Handling
const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
}

// Endpoints
app.get('/api/search', asyncHandler(async (req, res) => {

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

app.post('/api/signuppage', asyncHandler(async (req, res) => {

    try {
        let { email, password } = req.body
        let queryString = `SELECT * FROM users WHERE email = $1`
        
        // Salt To Be Used With Password
        const SALT = 16
        let validiations = []

        // Hashing The Password Entered
        let hashedPassword = await bcrypt.hash(password, SALT)

        pool.query(
            queryString, [email], (err, results) => {
                let queryInsertString = `INSERT INTO users(email, password, accountType) VALUES($1, $2, $3) RETURNING id, password`

                if(err){
                    throw err
                } 
                
                // Email Exists
                if(results.rows.length > 0){
                    validiations.push({message: 'Email is taken'})
                    res.render('/signuppage', { validiations })
                }

                // Now Register User
                pool.query(
                    queryInsertString,[email, hashedPassword, 2], (err, results) => {
                        if(err){
                            throw err
                        }
                        res.redirect('/loginpage')
                    }
                )
            }
        )
    } catch (exception) {
        throw new Error(exception.message)
    }
}))

app.post('/api/loginpage', passport.authenticate('local', {
    successRedirect: '/USERS/DASHBOARDPAGE',
    failureRedirect: '/USERS/LOGINPAGE'
}))

// Checks If User Is Logged In
const checkLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/USERS/DASHBOARD')
    }
    next()
}

// User Is Not Logged In
const checkNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/USERS/LOGIN')
    }
}

// Global Error Handling
app.use(function (err, req, res, next) {
    res.status(500).send(err.message)
})


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)
