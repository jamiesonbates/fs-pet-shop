/* eslint-disable */

'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const pets = require('./router/pets');

app.use(pets);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

module.exports = app;

// const auth = require('basic-auth');

// app.use((req, res, next) => {
//   const user = auth(req);
//
//   if (!user || user.name !== 'jamiesonbates' || user.pass !== 'hello') {
//     res.set('WWW-Authenticate', 'Basic realm="example"');
//     res.sendStatus(401);
//   }
//   else {
//     return next();
//   }
// });

// Test Error Handling for ISE (500)
// app.get('/boom', (_req, _res, next) => {
//   next(new Error('BOOM!'));
// });
