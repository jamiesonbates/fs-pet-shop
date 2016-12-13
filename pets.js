#! /node

/* eslint-disable no-console*/
/* eslint-disable max-statements*/

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const index = process.argv[3];
    const pets = JSON.parse(data);

    if (index >= pets.length || index < 0) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
    else if (index) {
      console.log(pets[index]);
    }
    else {
      console.log(pets);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const age = process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];

    if (age && kind && name) {
      const pet = {};

      pet.age = parseInt(age);
      pet.kind = kind;
      pet.name = name;

      pets.push(pet);
      console.log(pet);
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', (updateErr, data) => {
    if (updateErr) {
      throw updateErr;
    }
    const pets = JSON.parse(data);
    const index = process.argv[3];
    const age = process.argv[4];
    const kind = process.argv[5];
    const name = process.argv[6];

    if (index >= pets.length || index < 0) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    else if (index && age && kind && name) {
      pets[index].age = parseInt(age);
      pets[index].kind = kind;
      pets[index].name = name;
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pets[index]);
    });
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (destroyErr, data) => {
    if (destroyErr) {
      throw destroyErr;
    }

    const pets = JSON.parse(data);
    const index = process.argv[3];

    if (index >= pets.length || index < 0) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
    else if (index) {
      console.log(pets[index]);
      pets.splice(index, 1);
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
