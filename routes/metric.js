'use strict'; 

const express = require('express'); 
const router = express.Router(); 

router.get('/', (req, res) => { 

  res.json({message : 'METRICS ARE AT THE METT YO'})
}); 

module.exports = router; 
