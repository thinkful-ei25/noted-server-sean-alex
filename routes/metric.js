'use strict'; 

const express = require('express'); 
const router = express.Router(); 

router.get('/', (req, res) => { 
  const userId = req.user.id;
  
  
  //TEMP
  res.json('Metrics are at thhe met YO'); 
}); 

router.post('/metric/startSession', (req, res) => { 
  //START SESSION
  const userName = req.body.user; 
  User.findOne({ username })
    .then(result => { 
      result.sessions.push([]); 
      result.save(); 
    })
    .catch(err => { 
      console.error('err', err); 
    }); 
  
}); 


module.exports = router; 
