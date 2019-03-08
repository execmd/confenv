[![Build Status](https://travis-ci.org/execmd/node-confenv.svg?branch=master)](https://travis-ci.org/execmd/node-confenv)
# node-confenv
NodeJS library for reading config file line by line to JS object

Installation
=
`npm install --save node-confenv`

Configuration
=
To change folder in whick module will seek for config file use env variable
`CONFIG_PATH=/etc/myapp node index.js`

Usage
=

.env file
```
# a = value a
b = value b
c.d = value d
 e= value e # this should be ignored as comment
int=123
float=123.456
bool=true
array=1,2,3
array2=1|2|3
array3=    1 OR 2 OR 3
```
index.js
```javascript
const config = require('node-confenv');
const assert = require('assert');

config.read('.env');

assert.equal(config.get('a'),  undefined, 'should be undefined if commented');
assert.equal(config.get('b'), 'value b', 'should be value b');
assert.deepEqual(config.get('c'), { d: 'value d' }, 'should be Object d: value d');
assert.equal(config.get('e'), 'value e', 'should be value e without comment part');

let obj = {
    b: 'value b',
    c: {
        d: 'value d'
    },
    e: 'value e'
};
assert.deepEqual(config.getAll(), obj, 'should be object of all params');

assert.equal(config.getInt('int'), 123, 'should be number 123');
assert(isNaN(config.getInt('nonexists')), 'should be number NaN on undefined');
assert(isNaN(config.getInt('c')), 'should be number NaN on object');

assert.equal(config.getFloat('float'), 123.456, 'should be number 123.456');
assert(isNaN(config.getFloat('nonexists')), 'should be number NaN on undefined');
assert(isNaN(config.getFloat('c')), 'should be number NaN on object');

assert(config.getBool('bool'), 'should be boolean True');
assert(!config.getBool('nonexists'), 'should be false on undefined');
assert(config.getBool('c'), 'should be true on object');

assert.deepEqual(config.getArray('array'), ['1', '2', '3'], 'should be array');
assert.deepEqual(config.getArray('array2', '|'), ['1', '2', '3'], 'should be array');
assert.deepEqual(config.getArray('array3', 'OR'), ['1', '2', '3'], 'should be array');
assert.deepEqual(config.getArray('nonexists'), [], 'should be empty array on undefined');
assert.deepEqual(config.getArray('c'), [ 'value d' ], 'should be array of object values');
```
And test our file
```bash
node index.js
```
TODO
====

- [ ] spread with environment vars
- [ ] auto convert types
