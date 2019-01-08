'use strict'; 

const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({ 
  img: { type: String , required: true },
  name: { type: String, required: true }, 
  function: { type: String, required: true}
}); 


module.exports = mongoose.model('Question', schema); 