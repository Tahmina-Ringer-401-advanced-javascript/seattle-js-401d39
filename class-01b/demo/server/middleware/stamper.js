'use strict';

// middleware is really good at adding things onto the request object

module.exports = (req, res, next) => {
  // stop the request object and add a property called 'timeStamp' with a value of new Date()
  req.timeStamp = new Date();

  // as long as we don't give next an argument, it will just move along to the next middleware argument
  next();
}