'use strict'; 

const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user'); 

router.get('/', (req, res) => { 
  const userId = req.user.id;
  
  
  //TEMP
  res.json('Metrics are at thhe met YO'); 
}); 

router.post('/startSession', (req, res) => { 
  const username = req.user.username; 
  // console.log('username', username); 
  User.findOne({ username })
      .then(result => { 
      console.log('sessions', result.sessions.length); 
      
      const sessions = result.sessions; 
      const sessionsCopy = [...sessions]; 
      sessionsCopy.push([]); 
      result.sessions = sessionsCopy; 
      result.save(); 
    })
    .catch(err => { 
      console.error('err', err); 
    }); 
  
}); 

router.post('/endSession', (req, res) => { 
  // const username = req.user.username; 

})

module.exports = router; 
