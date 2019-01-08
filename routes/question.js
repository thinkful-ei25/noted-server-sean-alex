'use strict'; 

const express = require('express'); 
const User = require('../models/user');

const router = express.Router(); 

router.get('/', (req, res, next) => { 
  const userId = req.user.id;

  User.findOne({ userId })
    .populate('questions')
    .then(result => { 
      res.json(result.questions[0]); 
    }); 
}); 

module.exports = router; 