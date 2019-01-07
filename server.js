'use strict'; 

const express = require('express'); 
const mongoose = require('mongoose'); 

const { PORT, MONGODB_URI } = require('./config'); 

const app = express(); 

if (require.main === module) { 
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(instance => { 
      const conn = instance.connections[0]; 
      console.log(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`); 
    })
    .catch(err => { 
      console.error(err); 
    }); 

    app.listen(PORT, function () { 
      console.info(`Server listening on ${this.address().port}`); 
    }).on('error', err => { 
      console.error(err); 
    }); 
}

module.exports = app; 