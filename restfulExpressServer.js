/* eslint-disable */

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// const auth = require('basic-auth');

// auth.use('/pets', (req, res) => {
//   const user = auth(req);
//
//   if (!user || user.name !== 'jamiesonbates' || user.pass !== 'hello') {
//     res.statusCode(401);
//     res.setHeader('WWW-Authenticate', 'Basic realm="example"');
//     res.end('Access denied');
//   }
//   else {
//     res.end('Access granted');
//   }
// });

// Read All
app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

// Post One
app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);
    const pet = {};
    pet.age = req.body.age;
    pet.kind = req.body.kind;
    pet.name = req.body.name;

    if (!pet || !pet.age || !pet.kind || !pet.name) {
      return res.sendStatus(400);
    }

    if (!pet) {
      return res.sendStatus(400);
    }

    pets.push(pet);

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});

// Read One
app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

// Update One Dynamically
app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id > pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    const age = req.body.age;
    const kind = req.body.kind;
    const name = req.body.name;

    if (!age && !kind && !name) {
      return res.sendStatus(400);
    }

    if (age) {
      pets[id].age = age;
    }

    if (kind) {
      pets[id].kind = kind;
    }

    if (name) {
      pets[id].name = name;
    }

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.set('Content-Type', 'application/json');
      res.send(pets[id]);
    });
  });
});

// Destroy One
app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);
    const id = Number.parseInt(req.params.id);

    if (id < 0 || id > pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    const pet = pets.splice(id, 1)[0];
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});

// Test Error Handling for ISE (500)
// app.get('/boom', (_req, _res, next) => {
//   next(new Error('BOOM!'));
// });

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
