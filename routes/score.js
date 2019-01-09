'use strict'

const express = require('express');
const router = express.Router(); 

const Question = require('../models/question'); 
const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res) => { 
  const userId = req.user.id; 
  const { name, definition } = req.body; 
  
  let isValid; 

  User.findOne( {userId} )
    .populate('questions')
    .then(result => {
      count += 1; 
      let index = count % 3; 
      const answer = result.questions[index]; 
      //JUST THE NAME RIGHT NOW
      // const isValid = 
      //   (name === answer.name && definition === answer.function) ? true : false; 
      isValid = (name === answer.name); 

      //SCORE FOR THAT WORD
 
      const score = ((isValid === true) ? 0.25 : -0.25) + answer.score;
      console.log('mValue', answer.mValue);  
      return Question.updateOne({name: answer.name}, {mValue: score}); 
    })
      .then(result => { 
        console.log('update value', result.mValue); 
        res.json(isValid);  

      });  
}); 

module.exports = router; 