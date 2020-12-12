'use strict';

const express = require('express');
const app = express();

// our middleware
const logger = require('./middleware/logger');
const notFoundHandler = require('./error-handler/404');
const serverError = require('./error-handler/500');
const bananaRoutes = require('./routes/banana-routes');

// my middleware
app.use(express.json()); // turns my req.body into json
app.use(logger); // console.log() routes and methods
app.use(bananaRoutes); // all of my routes

// proof of life
app.get('/demo', demoCallbackHandler);

function demoCallbackHandler(req, res, next){
  res.status(200).send('alive');
}

// CRUD - CREATE - READ - UPDATE - DELETE
// REST - post      get    put      delete


// error handler
app.use('*', notFoundHandler); // 404 not found if we don't hit a route we made
app.use(serverError); // 500 error when something throws an error

// exporting app and start
// so we can access it in the index and the tests
module.exports = {
  server: app,
  start: port => {
    if(!port) { throw new Error('missing port');}
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    })
  }
}