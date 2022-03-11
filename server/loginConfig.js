const LocalStrategy = require("passport-local").Strategy
const pool = require('./db')
const bcrypt = require('bcrypt')

const initialize = (passport) => {

    const authentication = (email, password, done) => {
        try {
            let queryString = `SELECT * FROM users WHERE email = $1`
            
            pool.query(
                queryString, [email], (err, results) => {
                    if(err){
                        return err
                    }
                    
                    // Checking If Email Exists
                    if(results.rows.length > 0){
                        const user = results.rows[0]
    
                        // Compare User Password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if(err){
                                return err
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
        } catch (exception){
            throw new Error(exception.message)
        }
    }

    passport.use(
        new LocalStrategy({
            emailField: 'email',
            passwordField: 'password'
        }, authentication)
    )

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done) => {
        try {
            let queryIDString = `SELECT * FROM users WHERE id = $1`

            pool.query(
                queryIDString, [id], (err, results) => {
                    if(err){
                        res.status(500).send('An Unexpected Error Occurred')
                        return
                    } 
                    return done(null, results.rows[0])
                }
            )
        } catch (exception) {
            throw new Error(exception.message)
        }
    })
}

module.exports = initialize