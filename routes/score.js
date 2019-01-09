'use strict'

const express = require('express');
const router = express.Router(); 

const Question = require('../models/question'); 
const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res, next) => { 
  const userId = req.user.id; 
  const { name, definition } = req.body; 
  
  let isValid; 

  User.findOne( {userId} )
    .then(result => {
      count += 1; 
      let index = count % 3; 
      const answer = result.questions[index];
      const questionArr = result.questions;
      //JUST THE NAME RIGHT NOW
      // const isValid = 
      //   (name === answer.name && definition === answer.function) ? true : false; 
      isValid = (name === answer.name); 

      //SCORE FOR THAT WORD
      let score = ((isValid === true) ? 2 : 0.5) * result.questions[result.head].memoryStrength;
      console.log('memoryStrength', answer.memoryStrength);
      console.log(isValid); 
      return User.updateOne({_id: userId, questions: answer.name}, {$set: {$arrayElemAt:[questions, index]}}, {new: true});
    })
    .then(result => {
      console.log(result);
      console.log('update value', result.memoryStrength); 
      res.json(isValid);
    })
    .catch(err => next(err));
}); 

module.exports = router; 