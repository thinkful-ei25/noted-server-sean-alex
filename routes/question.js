'use strict'; 

const express = require('express'); 

const Question = require('../models/question'); 

const router = express.Router(); 

router.get('/', (req, res) => { 
  res.send('test'); 
}); 