'use strict'

const express = require('express'); 
const router = express.Router(); 

const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res) => { 
  const userId = req.user.id; 
  const { name, definition } = req.body; 
  
  User.findOne( {userId} )
    .populate('questions')
    .then(result => {
      count += 1; 
      let index = count % 3; 
      const answer = result.questions[index]; 
      //JUST THE NAME RIGHT NOW
      // const isValid = 
      //   (name === answer.name && definition === answer.function) ? true : false; 
      const isValid = (name === answer.name); 
      res.json(isValid); 
    }); 
}); 

module.exports = router; 