'use strict'; 

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); 

const schema = new mongoose.Schema(
  { 
  fullname: { type: String, default: '' }, 
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true}, 
  questions : [{
    _id: mongoose.Schema.Types.ObjectId, 
    img: String, 
    name: String,
    description: String, 
    memoryStrength: { type: Number, default: 1 },  
    next: Number
  }],
  sessions : [{ 
    sumScore: { type: Number, default: 0},
    answers: [ 
      { answer: { type: Number } }
    ]
  }], 
  // currentAverage: { type: Number, default: 0}, 
  // runningAverage: { type: Number, default: 0}, 
  // numSession: { type: Number, default: 0 }, 
  // improvmenet : { type: Number, default: 0 }, 
  head: {type: Number, default: 0}
  }, 
  {timestamps: true}
); 

schema.set('toJSON', { 
  virtual: true, 
  transform: (doc, result) => { 
    doc._id = result.id;
    delete result._id; 
    delete result.__v; 
    delete result.password; 
  }
});

schema.methods.validatePassword = function (pwd) { 
  const currentUser = this; 
  return bcrypt.compare(pwd, currentUser.password); 
}; 

schema.statics.hashPassword = function (pwd) { 
  return bcrypt.hash(pwd, 10); 
};



module.exports = mongoose.model('User', schema); 