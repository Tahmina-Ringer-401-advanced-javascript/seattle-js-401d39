'use strict';

function notFoundHandler(req, res, next){
  res.status(404).send('resource not found');
}

module.exports = notFoundHandler;