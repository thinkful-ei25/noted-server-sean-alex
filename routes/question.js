'use strict'; 


const express = require('express'); 
const User = require('../models/user');

const router = express.Router(); 

let count = 0; 

router.get('/', (req, res, next) => { 
  const userId = req.user.id;

  User.findOne({ userId })
    .populate('questions')
    .then(result => { 
      count++; 
      let index = count % 3; 
      const answer = result.questions[index]; 
      const question = result.questions[index]; 
      res.json(question); 
    }); 
}); 

module.exports = router; 