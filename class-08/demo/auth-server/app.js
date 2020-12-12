'use strict';

// 3rd Party Resources
const express = require('express');
const mongoose = require('mongoose');
const basicAuth = require('./basic-auth-middleware.js');
const bearerAuth = require('./bearer-auth-middleware.js');
const acl = require('./acl-middleware.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(express.static('./public'));
app.use(express.json());

// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// or
// http post :3000/signup username=john password=foo
app.post('/signup', (req, res) => {
  users.save(req.body)
    .then(user => {
      let token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(e => { res.status(403).send("Error Creating User"); });
});

// http post :3000/signin -a john:foo
app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.user);
});

// After getting a token from the signin route ...
// http :3000/signup "Authorization:Bearer MYTOKEN"
app.get('/allusers', bearerAuth, (req, res) => {
  res.status(200).send('OK!');
});

// Use bearer middleware first to make sure you're a valid user
// If you are, it'll call next() and then the acl() middleware will run
// This middleware will see if your user has the correct permissions
// If so, it'll call next() and send you to the route handler itself
// If either of those fails, the middlewares will call next("with an error"), stopping the user
app.get('/create', bearerAuth, acl("create"), (req, res) => {
  res.status(200).send('OK!');
});

app.get('/update', bearerAuth, acl("update"), (req, res) => {
  res.status(200).send('OK!');
})

app.get('/delete', bearerAuth, acl("delete"), (req, res) => {
  res.status(200).send('OK!');
});

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => console.log('server up'));
  })
  .catch(e => console.error('Could not start server', e.message));
