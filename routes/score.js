'use strict'

const express = require('express'); 
const router = express.Router(); 

const User = require('../models/user'); 

router.post('/', (req, res) => { 
  const userId = req.user.id; 
  const { name, definition } = req.body; 

  User.findOne( {userId} )
    .populate('questions')
    .then(result => {
      const answer = result.questions[0]; 
      const isValid = 
        (name === answer.name && definition === answer.function) ? 'Correct' : 'Incorrect'; 
      
        res.json(isValid); 
    }); 
}); 

router.get('/', (req, res) => { 
  
  //WILL CHANGE THE ITEM IN THE ARRAY AFTER VALIDATION
  res.send('BYE'); 
}); 

module.exports = router; 