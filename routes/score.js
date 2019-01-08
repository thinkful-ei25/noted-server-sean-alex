'use strict'

const express = require('express'); 
const router = express.Router(); 

router.post('/', (req, res) => { 
  res.send('HI')
}); 

router.get('/', (req, res) => { 
  res.send('BYE'); 
}); 

module.exports = router; 