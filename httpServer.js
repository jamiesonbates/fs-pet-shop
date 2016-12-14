/* eslint-disable */

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === petRegExp) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal server error');

        return;
      }

      if (req.url === '/pets/ ') {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
      else if (req.url === '/pets/1') {
        const pets = JSON.parse(data);
        const petJSON = JSON.stringify(pets[0]);

        res.setHeader('Content-Type', 'application/json');
        res.end(petJSON);
      }
      else if (req.url === '/pets/2') {
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
});

const port = 7500;

server.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

module.exports = server;
