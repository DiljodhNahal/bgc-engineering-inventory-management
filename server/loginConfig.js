const PassportStrategy = require("passport-local").Strategy
const { pool } = require("./index")
const bcrypt = require('bcrypt')
