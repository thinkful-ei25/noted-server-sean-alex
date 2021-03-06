'use strict';

const express = require('express');
const router = express.Router(); 


const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res, next) => { 
  const username  = req.user.username; 
  const { guess } = req.body;

  let isValid;

  User.findOne({ username })
    .then(result => {
      let answeredIndex = result.head;
      
      if (answeredIndex === null) { 
        console.error('ANSWERED INDEX SHOULD NOT BE NULL'); 
        answeredIndex = 0; 
      }

      const answered = result.questions[answeredIndex];

      let normalizedGuess = guess.toLowerCase();
      let normalizedAnswer = answered.name.toLowerCase();

      isValid = (normalizedGuess === normalizedAnswer);

      //MEMORY STRENGTH SHOULD NOT BE 0
      if (answered.memoryStrength === 0) { 
        console.error('memoryStrength cannot be 0'); 
        answered.memoryStrength = 1; 
      } 
      let scoreVal; 
      if(isValid === true){
        scoreVal = 1; 
        answered.memoryStrength *=2;
      }
      else {
        scoreVal = 0; 
        answered.memoryStrength = 1;
      }
      const currMemoryStrength = answered.memoryStrength; 

      result.sessions[result.sessions.length-1].answers.push({answer: scoreVal, questionName: answered.name}); 
      result.head = answered.next;

      let current = answered;
      for(let i=0; i<answered.memoryStrength; i++){
        const nextIndex = current.next;
        
        if(nextIndex === null){
          console.error('Error: Next index cannot be null'); 
          break;
        }
        current = result.questions[nextIndex];
      }

      answered.next = current.next;
      current.next = answeredIndex;
      
      result.save();
      return res.json({isValid, score: currMemoryStrength});
    })
    .catch(err => console.log('err', err));
}); 

module.exports = router; 