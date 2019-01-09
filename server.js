'use strict'; 

const express = require('express'); 
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const passport = require('passport'); 
const cors = require('cors'); 

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config'); 

const localStrategy = require('./passport/local'); 
const jwtStrategy = require('./passport/jwt'); 

const authRouter = require('./routes/auth'); 
const userRouter = require('./routes/user'); 
const questionRouter = require('./routes/question'); 
const scoreRouter = require('./routes/score'); 
const metricRouter = require('./routes/metric'); 

const app = express(); 
mongoose.Promise = global.Promise; 

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
); 

app.use(morgan(process.env.NODE_ENV === 'developement' ? 'dev' : 'common', { 
  skip: () => process.env.NODE_ENV === 'test'
})); 

passport.use(localStrategy); 
passport.use(jwtStrategy); 

const jwtAuth =  passport.authenticate('jwt', { session: false, failWithError: true }); 

app.use('/api/score', jwtAuth, scoreRouter); 
app.use('/api/user', userRouter); 
app.use('/api/auth', authRouter); 
app.use('/api/question', jwtAuth, questionRouter); 

app.use('/api/metric', jwtAuth, metricRouter); 

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
  mongoose.connect(DATABASE_URL, {useNewUrlParser: true })
    .then(instance => { 
      const conn = instance.connections[0]; 
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
    })
    .catch(err => { 
      console.error('Error connecting to MONGO:', err); 
    }); 

    app.listen(PORT, function () { 
      console.info(`Server listening on ${this.address().port}`); 
    }).on('error', err => { 
      console.error('Error connecting to the SERVER:', err); 
    }); 
}

module.exports = app; 