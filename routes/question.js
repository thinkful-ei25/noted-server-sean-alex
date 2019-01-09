'use strict'; 


const express = require('express'); 
const User = require('../models/user');

const router = express.Router(); 

router.get('/', (req, res, next) => { 
  const userId = req.user.id;

  User.findOne({ userId })
    .populate('questions')
    .then(result => { 
      console.log(result.questions[0].name); 
      // console.log(result.function)
      const question = result.questions[0]; 

      res.json(question); 
    }); 
}); 

module.exports = router; 