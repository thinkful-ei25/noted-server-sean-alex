'use strict'; 

const mongoose = require('mongoose'); 
const { MONGODB_URI } = require('../config'); 
const Question = require('../models/question');
const User = require('../models/user'); 
const questions = require('../db/data'); 

function seedQuestions (){
  return new Promise(function(resolve, reject) {
    
    console.info('Deleting Questions'); 
    Question.deleteMany()
      .then(() => { 
        console.log('Inserting Questions'); 
        return Question.insertMany(questions); 
      })
      .then(results => { 
        resolve(results); 
      })
      .catch(err => { 
        reject(console.error(err)); 
    }); 
  });
}

module.exports = seedQuestions; 