'use strict'; 

const express = require('express'); 
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const passport = require('passport'); 
const cors = require('cors'); 


const { PORT, MONGODB_URI } = require('./config'); 
const localStrategy = require('./passport/local'); 
const jwtStrategy = require('./passport/jwt'); 

const authRouter = require('./routes/auth'); 
const userRouter = require('./routes/users'); 

const app = express(); 

app.use(morgan(process.env.NODE_ENV === 'developemnet' ? 'dev' : 'common', { 
  skip: () => process.env.NODE_ENV === 'test'
})); 

app.use(express.json());

passport.use(localStrategy); 
passport.use(jwtStrategy); 

const jwtAuth =  passport.authenticate('jwt', { session: false, failWithError: true }); 

// Custom 404 Not Found Error Handler
app.use((req, res, next) => { 
  const err = new Error('Not Found'); 
  err.status = 404; 
  next(err); 
}); 

// Custom Error Handler
app.use((err, req, res, next) => { 
  if (err.status) { 
    const errBody = Object.assign({}, err, { message: err.message }); 
    res.status(err.status).json(errBody); 
  } else { 
    res.status(500).json({ message: `Server Error: ${err}` }); 
  }
}); 

if (require.main === module) { 
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(instance => { 
      const conn = instance.connections[0]; 
      console.log(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`); 
    })
    .catch(err => { 
      console.error(err); 
    }); 

    app.listen(PORT, function () { 
      console.info(`Server listening on ${this.address().port}`); 
    }).on('error', err => { 
      console.error(err); 
    }); 
}

module.exports = app; 