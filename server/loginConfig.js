const LocalStrategy = require("passport-local").Strategy
const pool = require('./db')
const bcrypt = require('bcrypt')

const initialize = (passport) => {
    const authentication = (email, password, done) => {

        let queryString = `SELECT * FROM users WHERE email = $1`
        pool.query(
            queryString, [email], (err, results) => {
                if(err){
                    throw err
                }
                
                // Checking If Email Exists
                if(results.rows.length > 0){
                    const user = results.rows[0]

                    // Compare User Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            throw err
                        }
                        
                        if(!isMatch){
                            return done(null, false, {message: 'Password incorrect'})
                        } else {
                            return done(null, user)
                        }
                    })
                } else {
                    return done(null, false, {message: 'Email does not exist'})
                }
            }
        )
    }

    passport.use(
        new LocalStrategy({
            emailField: 'email',
            passwordField: 'password'
        }, authentication)
    )

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        let queryIDString = `SELECT * FROM users WHERE id = $1`

        pool.query(
            queryIDString, [id], (err, results) => {
                if(err){
                    throw err
                } 
                return done(null, results.rows[0])
            }
        )
    })
}

module.exports = initialize