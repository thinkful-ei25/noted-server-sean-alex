'use strict'; 


const express = require('express'); 
const User = require('../models/user');

const router = express.Router(); 


router.get('/', (req, res, next) => { 
<<<<<<< HEAD
  const fullname = req.user.fullname;
  // console.log('userId', userId); 

  User.findOne({ fullname })
=======
  const username = req.user.username;

  User.findOne({ username })
>>>>>>> 5b8626bd43513e97d89ffbaff554324f32fdfc2e
    .then(result => { 
      let index = result.head;
      console.log(index);
      const question = result.questions[index]; 
      res.json(question); 
    }); 
}); 

module.exports = router; 