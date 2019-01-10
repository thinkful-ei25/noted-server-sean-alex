'use strict'; 

const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user'); 

router.get('/', (req, res) => { 
  const userId = req.user.id;
  
  
  //TEMP
  res.json('Metrics are at thhe met YO'); 
}); 

router.post('/startSession', (req, res) => { 
  const username = req.user.username; 

  User.findOne({ username })
    .then(result => { 
      
      const sessions = result.sessions; 
      const sessionsCopy = [...sessions]; 
      sessionsCopy.push([]); 
      result.sessions = sessionsCopy; 
      result.save(); 
    })
    .catch(err => { 
      console.error('err', err); 
    }); 
  
}); 

router.post('/endSession', (req, res) => { 
  const username = req.user.username; 

  console.log('ENDING SESSION!'); 
  User.findOne({ username })
    .then(result => { 
      const currAnswers = result.sessions[result.sessions.length -1].answers; 

      let sumAnswers =0; 
      currAnswers.forEach(item => { 
        console.log(item); 
        sumAnswers+= item.answer;
      }); 
      console.log('sum', sumAnswers); 

      result.sessions[result.sessions.length- 1].sumScore = sumAnswers;     
      result.save();
    })
    .catch(err => { 
      console.error('err', err); 
    }); 

})

module.exports = router; 
