'use strict'; 

const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({ 
  img: { type: String , required: true },
  name: { type: String, required: true }, 
  function: { type: String, required: true}, 
}); 

schema.set('toJSON', { 
  virtual: true, 
  transform: (doc, result) => { 
    delete result._id; 
    delete result.__v; 
  }
});

module.exports = mongoose.model('Question', schema); 