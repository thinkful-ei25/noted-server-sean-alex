'use strict'; 

const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user'); 

router.get('/', (req, res, next) => { 
  const username = req.user.username;

  User.findOne({ username })
    .then(result => {
      const userSessions = result.sessions;
      
      if (userSessions.length ===0){
        return res.json({lastSessionAvg: 0});
      }

      let sumSessions =0;
      let sumOfQuestions =0;
      userSessions.forEach(item => {
        sumSessions += item.sumScore;
        sumOfQuestions += item.answers.length;
      });
      result.allSessionsAvg = (sumSessions / sumOfQuestions);

      const currAvg = result.sessions[result.sessions.length -1].sessionAvg; 
      if (result.sessions.length >= 2){ 
        const prevAvg = result.sessions[result.sessions.length -2].sessionAvg; 
        result.improvement = (currAvg/prevAvg); 
      } 

      result.save();

      let allSessionsAvg = result.allSessionsAvg;      
      let recent = result.sessions[result.sessions.length-1].sumScore;
      let recentAvg = result.sessions[result.sessions.length-1].sessionAvg;
      let improvement = result.improvement; 
      res.json({lastSessionScore: recent, lastSessionAvg: recentAvg, allSessionsAvg: allSessionsAvg, improvement});
    })
    .catch(err => next(err));

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
      return res.json({message: 'DUDE'});
    })
    .then(result => res.status(200))
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
      const userSessions = result.sessions;

      let sumSessions =0;
      userSessions.forEach(item => sumSessions += item.sumScore);

      let sumAnswers =0; 
      currAnswers.forEach(item => sumAnswers+= item.answer);
      
      userSessions[userSessions.length- 1].sessionAvg = parseFloat(sumAnswers / userSessions[userSessions.length- 1].answers.length);
      userSessions[userSessions.length- 1].sumScore = sumAnswers;     
      result.save();
      return res.json({message: 'DUDEZOR'});
    })
    .catch(err => { 
      console.error('err', err); 
    }); 

});

module.exports = router; 
