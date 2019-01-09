'use strict'; 

const express = require('express'); 
const router = express.Router(); 

router.get('/', (req, res) => { 
  const userId = req.user.id;
  
  console.log('user', req.user.fullname); 

  //TEMP
  res.json('Metrics are at thhe met'); 
}); 

module.exports = router; 
