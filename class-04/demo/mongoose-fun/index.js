// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('I am connected');
});

// 1. create a schema
const kittySchema = new mongoose.Schema({
  name: String
});

// 2. make a model
const Kitten = mongoose.model('Kitten', kittySchema);

// model is a way of interacting with our collection

// made a new entry in the database
const silence = new Kitten({ name: 'Silence' });

// takes time to hit the database!
// async code!
silence.save().then(() => console.log('meow'));

