/* eslint-disable */

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const errGuard = function(err) {
  if (err) {
    console.error(err.stack);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal server error');

    return;
  }
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      errGuard(err);

      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  }
  else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      errGuard(err);

      const pets = JSON.parse(data);
      const petJSON = JSON.stringify(guests[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/pets/2') {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      errGuard(err);

      const pets = JSON.parse(data);
      const petJSON = JSON.stringify(pets[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

const port = 8000;

server.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
