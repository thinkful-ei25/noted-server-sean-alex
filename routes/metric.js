'use strict'; 

const express = require('express'); 
const router = express.Router(); 

router.get('/', (req, res) => { 
  const userId = req.user.id;
  
  
  //TEMP
  res.json('Metrics are at thhe met YO'); 
}); 

module.exports = router; 
