'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router(); 

const Question = require('../models/question'); 
const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res, next) => { 
  const username  = req.user.username; 
  const { guess } = req.body;
  let isValid;
  console.log(guess); 

  User.findOne({ username }, function (err, result) {
    const answer = result.questions[result.head];
    console.log(answer.name);
    isValid = (guess === answer.name);
    let memoryScore = ((guess.guess === answer) ? 2 : 0.5) * result.questions[result.head].memoryStrength;
    
    if (err) {
      console.log('Error,', err);
      throw new Error(err);
    } 
    else {
      result.questions[result.head].memoryStrength = memoryScore;
      result.save();

      return res.json({isValid});
    }
  });



  User.findOne({ username })
    .then(result => {
      const answeredIndex = result.head;
      const answered = result.questions[result.head];
      isValid = (guess === answered.name);
      if(isValid === true){
        answered.memoryStrength *=2;
      }
      else {
        answered.memoryStrength = 1;
      }

      result.head = answered.next;

      let current = answered;
      for(let i=0; i<answered.memoryStrength; i++){
        const nextIndex = current.next;
        if(nextIndex === null){
          break;
        }
        current = result.questions[nextIndex];
      }

      answered.next = current.next;
      current.next = answeredIndex;
      
      result.save();
      return res.json({isValid});
    })
    // .then(results =>{ 
    //   console.log(results.questions[results.head].memoryStrength);
    //   res.json(results);
    // })
    .catch(err => console.log(err));

  // User.findOne( {userId})
  //   .then(result => {
  //     count += 1; 
  //     let index = count % 3; 
  //     const answer = result.questions[index];
  //     const questionArr = result.questions;
  //     //JUST THE NAME RIGHT NOW
  //     // const isValid = 
  //     //   (name === answer.name && definition === answer.function) ? true : false; 
  //     isValid = (name === answer.name); 

  //     //SCORE FOR THAT WORD
  //     let score = ((isValid === true) ? 2 : 0.5) * result.questions[result.head].memoryStrength;
  //     console.log('memoryStrength', answer.memoryStrength);
  //     console.log(isValid);
  //     mongoose.set('debug', true); 
  //     return User.updateOne({ _id: userId }, {$set: {'questions.0.memoryStrength': score}});
  //   })
  //   .then(result => {
  //     console.log(result);
  //     console.log('update value', result.memoryStrength); 
  //     res.json(isValid);
  //   })
  //   .catch(err => next(err));
}); 

module.exports = router; 