'use strict'; 


const express = require('express'); 
const User = require('../models/user');

const router = express.Router(); 

let count = 0; 

router.get('/', (req, res, next) => { 
  const fullname = req.user.fullname;
  // console.log('userId', userId); 

  User.findOne({ fullname })
    .then(result => { 
      count++; 
      let index = count % 3;
      const question = result.questions[index]; 
      res.json(question); 
    }); 
}); 

module.exports = router; 