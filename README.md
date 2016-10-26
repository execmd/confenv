[![Build Status](https://travis-ci.org/execmd/node-confenv.svg?branch=master)](https://travis-ci.org/execmd/node-confenv)
# node-confenv
NodeJS library for reading config file line by line to JS object

Installation
=
`npm install --save confenv`

Usage
=

.env file
```
# a = value a
b = value b
c.d = value d
 e= value e # this should be ignored as comment
```
index.js
```javascript
const config = require('confenv');
const assert = require('assert');

config.read('.env');

assert.equal(config.get('a'),  undefined, 'should be undefined if commented');
assert.equal(config.get('b'), 'value b', 'should be value b');
assert.deepEqual(config.get('c'), { d: 'value d' }, 'should be Object d: value d');
assert.equal(config.get('e'), 'value e', 'should be value e without comment part');
```
And test our file
```bash
node index.js
```
