'use strict';

function validate(req, res, next) {
  const name = req.query.name;
  if(!name) { next('name required'); }
  else { next(); }
}

module.exports = validate;