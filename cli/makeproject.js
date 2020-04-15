#! /usr/bin/env node

let makemy = null;

try {
  makemy = require(`${process.cwd()}../node_modules/makemy`);
} catch (e) {
  makemy = require('makemy');
}

makemy.init(process.cwd());
