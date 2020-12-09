'use strict';

const express = require('express');
const app = express();

const notFoundHandler = require('../error-handler/404');
const errorHandler = require('../error-handler/500');

// body parser that accepts json
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// query
app.get('/fruit', (req, res) => {
  let output = {
    type: req.query.type
  }

  res.status(200).json(output);
});

// param
app.get('/fruit/:type', (req, res) => {
  let output = {
    type: req.params.type
  }

  res.status(200).json(output);
});

// body
app.post('/fruit', (req, res) => {
  console.log('what got added? ', req.body);
  res.status(200).send('ok');
});

// update the body
app.put('/fruit', (req, res) => {
  console.log('what got updated?', req.body);
  res.status(201).send('ok');
});

// middleware

// middleware functions have three options
// 1. all good - next()
// 2. not good - next('message') - throw an error
// 3. deal with it yourself -don't call next, but deal with the response object

// log a request
const logRequest = require('./logger');

// express works by saying 'use this function as a piece of middleware'
// this will apply to ALL routes
app.use(logRequest);

// adds browser to the request object
function getBrowser(req, res, next) {
  req.browser = req.headers['user-agent'];
  next();
}

// sends the request object with the browser key to the front end
app.get('/browser', getBrowser, (req, res) => {
  let output = {
    browser: req.browser
  }
  res.status(200).json(output);
})

function square(n) {
  return (req, res, next) => {
    if(typeof n !== 'number'){
      next('Not a number');// make it skip the rest of the middleware and just throw and error
    } else {
      req.number = n * n;
      next();
    }
  }
}

app.get('/mw', square(10), getBrowser, (req, res, next) => {
  let output = {
    browser: req.browser,
    number: req.number
  }

  res.status(200).json(output);
})

// CRUD: CREATE READ UPDATE DELETE

let db = [];
// {
//   id: 12,
//   type: 'banana',
// }

// get all 
app.get('/api/v1/food', (req, res, next) => {
  const count = db.length;
  const results = db;
  res.status(200).json({count, results});
});

// get one
app.get('/api/v1/food/:id', (req, res, next) => {
  const id = req.params.id;
  const record = db.find(food => food.id === parseInt(id));
  res.status(200).json(record);
});

// create
app.post('api/v1/food', (req, res, next) => {
  // create a new object with key of 'name', 
  // the value of that 'name' key will be the req.body.name
  let record = { name: req.body.name };
  record.id = db.length + 1;
  db.push(record);
  res.status(200).json(record);
})

// update
app.put('api/v1/food/:id', (req, res, next) => {
  const idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  db = db.map(record => record.id === parseInt(idToUpdate))
  res.status(200).json(updatedRecord);
})

// delete
app.delete('api/v1/food/:id', (req, res, next) => {
  const id = req.params.id;
  db = db.filter(food => food.id !== parseInt(id));
  res.status(204).send('ok');
})






app.use('*', notFoundHandler);
app.use(errorHandler);

function start(PORT){
  app.listen(PORT, () =>{
    console.log(`listening on ${PORT}`);
  })
}

module.exports = {
  server: app,
  start: start
}
