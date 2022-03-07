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

initializePassport(passport)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'src/pages'))

app.use(
    session({
        secret: 'hidden',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
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
        let response = { count: results.rowCount, results: results.rows }

        res.send(response)
    } catch (exception) {
        throw new Error(exception.message)
    }

}))

app.post('/api/signup', asyncHandler(async (req, res) => {

    try {
        let { email, password } = req.body

        let queryString = `SELECT * FROM users WHERE email = $1`
        let response

        // Salt To Be Used With Password
        const SALT = 16

        // Hashing The Password Entered
        bcrypt.hash(password, SALT, (err, hash) => {
            if (err) {
                res.status(500).send('An Unexpected Error Occurred')
                return
            }
            pool.query(
                queryString, [email], (err, results) => {
                    let queryInsertString = `INSERT INTO users("email", "password", "accountType") VALUES($1, $2, $3) RETURNING id, password`

                    if (err) {
                        res.status(500).send('An Unexpected Error Occurred')
                        return
                    }

                    // Email Exists
                    if (results.rows.length > 0) {
                        res.status(409).send('Email Already Exists')
                        return
                    }

                    // Now Register User
                    pool.query(
                        queryInsertString, [email, hash, 2], (err, result) => {
                            if (err) {
                                response = { message: 'An Unexpected Error Occurred', status: 500 }
                                res.send(response)
                                return
                            }
                            res.status(201).send('Account Created')
                        }
                    )
                }
            )
        })

    } catch (exception) {
        console.log(exception)
        throw new Error(exception.message)
    }
}))

/*
app.post('/api/auth', passport.authenticate('local'), (req, res, next) => {
    try{
        console.log(req)
        console.log(res)
        res.redirect('/')
    } catch (exception){
        console.log(exception)
    }
})
*/

app.post(
    "/api/auth",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth",
    })
  );

// Checks If User Is Logged In
app.get('/api/autheticated', asyncHandler(async (req, res) => {
    let response = {
        status: req.isAuthenticated()
    }
    if (req.isAuthenticated())
        response.user = req.user

    res.send(response)
}))

// Global Error Handling
app.use(function (err, req, res, next) {
    res.status(500).send(err.message)
})


app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)
