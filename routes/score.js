'use strict'

const express = require('express');
const router = express.Router(); 


const User = require('../models/user'); 

let count = 0; 
router.post('/', (req, res, next) => { 
  console.log('yoo'); 
  const fullname = req.user.fullname;
  const id = req.user._id;  

  // const { name, definition } = req.body; 
  // console.log('userId score', userId); 
  console.log('fullname', fullname);
  console.log('id', id); 
  console.log('user', req.user); 
  // let isValid; 

  User.find( {fullname} )
    .then(result => { 
      // console.log('result', result); 
    })
    .catch(err => { 
      console.err('err', err); 
    }); 
  //   .then(result => {
  //     console.log('hello'); 
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
  //   }); 
  //     return User.updateOne({_id: userId, questions: answer.name}, {$set: {$arrayElemAt:[questions, index]}}, {new: true});
  //   })
  //   .then(result => {
  //     console.log(result);
  //     console.log('update value', result.memoryStrength); 
  //     res.json(isValid);
  //   })
  //   .catch(err => next(err));
}); 

module.exports = router; 