const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const path = require("path");
const pino = require("express-pino-logger")();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./loginConfig");
const session = require("cookie-session");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

initializePassport(passport);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "src/pages"));

app.use(
  session({
    secret: "hidden",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Global Error Handling
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// Endpoints
app.get(
  "/api/search",
  asyncHandler(async (req, res) => {
    try {
      // Build SQL String
      let queryString = `SELECT * FROM equipment`;
      let queries = 0;

      const updateString = (key, value) => {
        // Add Operators To Query String Dependant On Position
        if (queries === 0) {
          queryString += " WHERE";
        } else {
          queryString += " AND";
        }

        // Search or Filter Depending On key
        if (key === "name") {
          queryString += ` SIMILARITY(name, '${value}') > 0.4`;
        } else {
          // Add Key To Query String
          if (key === "id") {
            queryString += ` ${key} =`;
          } else {
            queryString += ` ${key} ilike`;
          }

          // Add Value To Query String
          if (Number.isInteger(value)) {
            queryString += ` ${value}`;
          } else {
            queryString += ` '${value}'`;
          }
        }

        queries += 1;
      };

      // Filters
      for (let key in req.query) updateString(key, req.query[key]);

      // Query Results
      let results = await pool.query(queryString);

      // Build Response
      let response = { count: results.rowCount, results: results.rows };

      res.send(response);
    } catch (exception) {
      throw new Error(exception.message);
    }
  })
);

app.post(
  "/api/signup",
  asyncHandler(async (req, res) => {
    try {
      let { email, password, accountType } = req.body;

      let queryString = `SELECT * FROM users WHERE email = $1`;
      let response;

      // Salt To Be Used With Password
      const SALT = 16;

      // Hashing The Password Entered
      bcrypt.hash(password, SALT, (err, hash) => {
        if (err) {
          res.status(500).send("An Unexpected Error Occurred");
          return;
        }
        pool.query(queryString, [email], (err, results) => {
          let queryInsertString = `INSERT INTO users("email", "password", "accountType") VALUES($1, $2, $3) RETURNING id, password`;

          if (err) {
            res.status(500).send("An Unexpected Error Occurred");
            return;
          }

          // Email Exists
          if (results.rows.length > 0) {
            res.status(409).send("Email Already Exists");
            return;
          }

          // Now Register User
          pool.query(
            queryInsertString,
            [email, hash, accountType],
            (err, result) => {
              if (err) {
                response = {
                  message: "An Unexpected Error Occurred",
                  status: 500,
                };
                res.send(response);
                return;
              }
              res.status(201).send("Account Created");
            }
          );
        });
      });
    } catch (exception) {
      throw new Error(exception.message);
    }
  })
);

// Validates The User And Redirects Them
app.post(
  "/api/auth",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth",
  })
);

// Checks If User Is Logged In
app.get(
  "/api/autheticated",
  asyncHandler(async (req, res) => {
    try {
      let response = {
        status: req.isAuthenticated(),
      };
      if (req.isAuthenticated()){
        response.user = req.user;
      }

      res.json(response);
    }
    catch (error) {
      console.log(error)
    }
       


  }));

// Logs Out The User
app.get(
  "/api/logout",
  asyncHandler(async (req, res) => {
    try {
      req.logout();
      res.json({ redirect: true });
    } catch (exception) {
      throw new Error(exception.message);
    }
  })
);

app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/requests", async (req, res) => {
  try {
    const allRequests = await pool.query("SELECT * FROM requests");
    res.json(allRequests.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/requests", async (req, res) => {
  try {
    const {
      itemId,
      name,
      requestor,
      requestDate,
      returnDate,
      isAccepted,
    } = req.body;
    const newRequest = await pool.query(
      'INSERT INTO requests ("itemId", name, requestor, "requestDate", "returnDate", "isAccepted") VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        itemId,
        name,
        requestor,
        requestDate,
        returnDate,
        isAccepted,
      ]
    );
    res.json(newRequest.rows[0]);
  } catch (exception) {
    throw new Error(exception.message);
  }
});

app.post('/api/approve/:id', async (req,res) =>{
  try {
    
    pool.query("UPDATE requests SET isAccepted =0 WHERE id=$1 RETURNING *",[req.params.id], (error,result) =>{
      res.json({message:`Request with ID ${req.params.id} approved`, status:200})
    });
    
  } catch (error) {
    console.error(error);
  }
})

app.post("/api/requests/delete/:id", async (req, res) => {
  try {
    pool.query("DELETE FROM requests WHERE id=$1", [req.params.id])
    res.status(204).send('Request Deleted');
  } catch (exception) {
    throw new Error(exception.message);
  }
})


app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM equipment");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const {
      name,
      description,
      color,
      serialNumber,
      price,
      purchaseDate,
      barcode,
      type,
      category,
      status,
      productCode,
      location,
      projectNumber,
      warrantyExpiryDate,
    } = req.body;
    const newItem = await pool.query(
      'INSERT INTO equipment (name, description, color, "serialNumber", price, "purchaseDate", barcode, type, category, status, "productCode", location, "projectNumber", "warrantyExpiryDate") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [
        name,
        description,
        color,
        serialNumber,
        price,
        purchaseDate,
        barcode,
        type,
        category,
        status,
        productCode,
        location,
        projectNumber,
        warrantyExpiryDate,
      ]
    );
    res.json(newItem.rows[0]);
  } catch (exception) {
    throw new Error(exception.message);
  }
});

app.post("/api/users/admin/delete/:id", async (req, res) => {
  try {
    req.logout();
    pool.query("DELETE FROM users WHERE id=$1", [req.params.id])
    res.json({ redirect: true });
  } catch (exception) {
    throw new Error(exception.message);
  }
})

app.post("/api/users/delete/:id", async (req, res) => {
  try {
    pool.query("DELETE FROM users WHERE id=$1", [req.params.id])
    res.status(204).send("Account Deleted")
  } catch (exception) {
    throw new Error(exception.message);
  }
})

app.post("/api/users/update/:id", async (req, res) => {
  try {
    let queryString = `UPDATE users SET email=$1, password=$2, "accountType"=$3 WHERE id=$4`;
    let { email, password, accountType } = req.body;

    // Salt To Be Used With Password
    const SALT = 16;

    // Hashing The Password Entered
    bcrypt.hash(password, SALT, (err, hash) => {
      if (err) {
        res.status(500).send("An Unexpected Error Occurred")
        return
      }
      pool.query(queryString, [email, hash, accountType, req.params.id])
      res.status(200).send("Account Deleted")
    })
  } catch (exception) {
    throw new Error(exception.message);
  }
})


app.post("/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      color,
      serialNumber,
      price,
      purchaseDate,
      barcode,
      type,
      category,
      status,
      productCode,
      locationItem,
      projectNumber,
      warrantyExpiryDate,
    } = req.body;
    const updatedItem = await pool.query(
      'UPDATE equipment SET name = $1, description = $2, color = $3, "serialNumber" = $4, price = $5, "purchaseDate" = $6, barcode = $7, type = $8, category = $9, status = $10, "productCode" = $11, location = $12, "projectNumber" = $13, "warrantyExpiryDate" = $14 WHERE id = $15',
      [
        name,
        description,
        color,
        serialNumber,
        price,
        purchaseDate,
        barcode,
        type,
        category,
        status,
        productCode,
        locationItem,
        projectNumber,
        warrantyExpiryDate,
        id,
      ]
    )
    

    res.json(updatedItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM equipment WHERE id = $1", [
      id
    ]);
  } catch (err) {
    console.log(err.message);
  }
});

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.get("*", function (req, res) {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Global Error Handling
app.use(function (err, req, res, next) {
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`Express Server Is Now Running On ${PORT}`));
