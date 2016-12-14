/* eslint-disable */

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const petRegExp = /^\/pets(.*)$/;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.match(petRegExp)) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal server error');

        return;
      }

      if (req.url === '/pets') {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
      else if (req.url === '/pets/0') {
        const pets = JSON.parse(data);
        const petJSON = JSON.stringify(pets[0]);

        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
      else if (req.url === '/pets/1') {
        const pets = JSON.parse(data);
        const petJSON = JSON.stringify(pets[1]);

        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      }
    });
  }
  else if (req.method === 'POST' && req.url === '/pets') {
    const headers = req.headers;
    const method = req.method;
    const url = req.url;

    const pets = JSON.parse(data);

    req.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      pets.push(chunk);
    }).on('end', function() {
      pets = Buffer.concat(pets).toString();



      response.on('error', function(err) {
        console.error(err);
      });

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
    });

    const petsJSON = JSON.stringify(pets[0]);

  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = 7500;

server.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

module.exports = server;
