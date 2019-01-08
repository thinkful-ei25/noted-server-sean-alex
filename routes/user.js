'use strict'; 

const express = require('express'); 

const seedQuestions = require('../utils/seed-questions'); 
const User = require('../models/user'); 

const router = express.Router(); 

router.post('/', (req, res, next) => { 
  //REQUIRE FIELDS
  const requiredFields = ['username', 'password']; 
  const missingField = requiredFields.find(field => !(field in req.body)); 

  if (missingField)  { 
    const err = new Error(`Missing '${missingField}' in request body`); 
    err.status = 422; 
    return next(err);
  }

  //REQUIRE FIELDS TYPE STRING
  const stringFields = ['username', 'password', 'fullname']; 
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  ); 

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  //EXPLICITY TRIM FIELDS
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    const err = new Error(`Field: '${nonTrimmedField}' cannot start or end with whitespace`);
    err.status = 422;
    return next(err);
  }

  //SPECIFIC SIZE OF FIELD
  const sizedFields = {
    username: { min: 1 },
    password: { min: 8, max: 72 }
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  if (tooSmallField) {
    const min = sizedFields[tooSmallField].min;
    const err = new Error(`Field: '${tooSmallField}' must be at least ${min} characters long`);
    err.status = 422;
    return next(err);
  }

  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooLargeField) {
    const max = sizedFields[tooLargeField].max;
    const err = new Error(`Field: '${tooLargeField}' must be at most ${max} characters long`);
    err.status = 422;
    return next(err);
  }

  // Username and password were validated as pre-trimmed
  let { username, password, fullname } = req.body;
  fullname = fullname.trim();

  let questions; 

  seedQuestions().then(result => { 
    questions = result; 
    console.log(result); 
    return User.hashPassword(password); 
  })
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname, 
        questions
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
}); 

module.exports = router;  