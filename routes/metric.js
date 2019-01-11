'use strict'; 

const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user'); 

router.get('/', (req, res) => { 
  const username = req.user.username;

  User.findOne({ username })
    .then(result => {
      const userSessions = result.sessions;

      let sumSessions =0;
      let sumOfQuestions =0;
      userSessions.forEach(item => {
        sumSessions += item.sumScore;
        sumOfQuestions += item.answers.length;
      });

      console.log('total avg', sumSessions);

      result.allSessionsAvg = (sumSessions / sumOfQuestions);
      result.save();

      let allSessionsAvg = result.allSessionsAvg;      
      let recent = result.sessions[result.sessions.length-1].sumScore;
      let recentAvg = result.sessions[result.sessions.length-1].sessionAvg;
      console.log({lastSessionScore: recent, lastSessionAvg: recentAvg, allSessionsAvg: allSessionsAvg});
      res.json({lastSessionScore: recent, lastSessionAvg: recentAvg, allSessionsAvg: allSessionsAvg});
    });

}); 

router.post('/startSession', (req, res) => { 
  const username = req.user.username; 

  User.findOne({ username })
    .then(result => { 
      
zx
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
      const userSessions = result.sessions;

      let sumSessions =0;
      userSessions.forEach(item => {
        sumSessions += item.sumScore;
      });
      console.log('total avg', sumSessions);

      let sumAnswers =0; 
      currAnswers.forEach(item => { 
        console.log(item); 
        sumAnswers+= item.answer;
      });
      
      console.log('sum', sumAnswers);
      userSessions[userSessions.length- 1].sessionAvg = parseFloat(sumAnswers / userSessions[userSessions.length- 1].answers.length);
      userSessions[userSessions.length- 1].sumScore = sumAnswers;     
      result.save();
    })
    .catch(err => { 
      console.error('err', err); 
    }); 

});

module.exports = router; 
