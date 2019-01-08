'use strict'; 

const mongoose = require('mongoose'); 
const { MONGODB_URI } = require('../config'); 
const Question = require('../models/question'); 
const questions = require('../db/data'); 

function seedData (){

  console.info('Deleting Questions'); 
  Question.deleteMany()
    .then(() => { 
      console.log('Inserting Questions'); 
      return Question.insertMany(questions); 
    })
    .then(results => { 
      console.log('Inserted', results); 
    })
    .catch(err => { 
      console.error(err); 
  }); 
}

module.exports = seedData; 