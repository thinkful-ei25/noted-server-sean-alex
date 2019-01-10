'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router(); 


const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res, next) => { 
  const username  = req.user.username; 
  const { guess } = req.body;
  let isValid;
  console.log(guess); 

  User.findOne({ username })
    .then(result => {
      let answeredIndex = result.head;
      
      if (answeredIndex === null) { 
        console.error('ANSWERED INDEX SHOULD NOT BE NULL'); 
        answeredIndex = 0; 
      }

      // console.log('answeredIndex', answeredIndex); 
      const answered = result.questions[answeredIndex];

      isValid = (guess === answered.name);
      // console.log(
      //   'isValid', isValid, 
      //   'answered name', answered.name, 
      //   'answered memoryStrength', answered.memoryStrength  
      // );

      //MEMORY STRENGTH SHOULD NOT BE 0
      if (answered.memoryStrength === 0) { 
        console.error('memoryStrength cannot be 0'); 
        answered.memoryStrength = 1; 
      } 

      if(isValid === true){
        answered.memoryStrength *=2;
      }
      else {
        answered.memoryStrength = 1;
      }

      // console.log('answered memoryStrength', answered.memoryStrength); 
      result.head = answered.next;
      // console.log('new head', result.head, 'answered.next', answered.next); 

      let current = answered;
      for(let i=0; i<answered.memoryStrength; i++){
        const nextIndex = current.next;
        
        if(nextIndex === null){
          console.log('HOPEFULLY WE DO NOT GET HERE'); 
          break;
        }
        // console.log('i', i, 'current', result.question[nextIndex]); 
        current = result.questions[nextIndex];
      }

      answered.next = current.next;
      current.next = answeredIndex;
      
      result.save();
      return res.json({isValid});
    })
    .catch(err => console.log('err', err));
}); 

module.exports = router; 