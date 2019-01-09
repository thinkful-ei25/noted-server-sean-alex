'use strict'; 


const express = require('express'); 
const User = require('../models/user');

const router = express.Router(); 


router.get('/', (req, res, next) => { 
  const username = req.user.username;

  User.findOne({ username })
    .then(result => { 
      let index = result.head;
      console.log(index);
      const question = result.questions[index]; 
      res.json(question); 
    }); 
}); 

module.exports = router; 