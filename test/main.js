'use strict';

const assert = require('assert');
const config = require('../dist/lib/Confenv.js');
config.read('test/.env');

describe('Confenv', function () {
    it('#read()', function () {
        config.read('test/.env');
    });

    describe('get()', function () {
        it('#get() ignore commented', function () {
            assert.equal(config.get('a'), undefined, 'should be undefined if commented');
        });

        it('#get() string value', function () {
            assert.equal(config.get('b'), 'value b', 'should be value b');
        });

        it('#get() object value', function () {
            assert.deepEqual(config.get('c'), {d: 'value d'}, 'should be Object d: value d');
        });

        it('#get() ignore commented part', function () {
            assert.equal(config.get('e'), 'value e', 'should be value e without comment part');
        });
    });

    it('#getAll()', function () {
        let obj = {
            b: 'value b',
            c: {
                d: 'value d'
            },
            e: 'value e',
            int: '123',
            float: '123.456',
            bool: 'true',
            bool2: 'True',
            bool3: 'TRUE',
            bool4: 'T',
            bool5: 'False',
            bool6: 'F',
            bool7: '1',
            bool8: '0',
            bool9: 'TrueFalseTrue',
            bool10: '1.99',
            bool11: '2',
            array: '1,2,3',
            array2: '1|2|3',
            array3: '1 OR 2 OR 3'
        };
        assert.deepEqual(config.getAll(), obj, 'should be object of all params');
    });

    describe('getInt', function () {
        it('#getInt() returns number', function () {
            assert.equal(config.getInt('int'), 123, 'should be number 123');
        });

        it('#getInt() on undefined', function () {
            assert(isNaN(config.getInt('nonexists')), 'should be number NaN on undefined');
        });

        it('#getInt() on Object', function () {
            assert(isNaN(config.getInt('c')), 'should be number NaN on object');
        });
    });

    describe('getFloat', function () {
        it('#getFloat() returns number', function () {
            assert.equal(config.getFloat('float'), 123.456, 'should be number 123.456');
        });

        it('#getFloat() on undefined', function () {
            assert(isNaN(config.getFloat('nonexists')), 'should be number NaN on undefined');
        });

        it('#getFloat() on Object', function () {
            assert(isNaN(config.getFloat('c')), 'should be number NaN on object');
        });
    });

    describe('getBool', function () {
        describe('#getBool() on string & numeric', function () {
            describe('#getBool() returns true', function () {

                [, 2, 3, 4, 7, 10, 11].map((inx) => '' + inx || '').forEach((inx) => {
                    it('Truthy on ' + config.get('bool' + inx), function () {
                        assert(config.getBool('bool' + inx), 'should be boolean Truthy');
                    });
                });

            });

            describe('#getBool() returns false', function () {

                [5, 6, 8, 9].forEach((inx) => {
                    it('Falsy on ' + config.get('bool' + inx), function () {
                        assert(!config.getBool('bool' + inx), 'should be boolean Falsy');
                    });
                });

            });
        });

        it('#getBool() on undefined', function () {
            assert(!config.getBool('nonexists'), 'should be false on undefined');
        });

        it('#getBool() on Object', function () {
            assert(config.getBool('c'), 'should be true on object');
        });
    });

    describe('getArray', function () {
        it('#getArray() returns array', function () {
            assert.deepEqual(config.getArray('array'), ['1', '2', '3'], 'should be array');
        });

        it('#getArray() with pipe separator', function () {
            assert.deepEqual(config.getArray('array2', '|'), ['1', '2', '3'], 'should be array');
        });

        it('#getArray() with OR separator', function () {
            assert.deepEqual(config.getArray('array3', 'OR'), ['1', '2', '3'], 'should be array');
        });

        it('#getArray() on undefined', function () {
            assert.deepEqual(config.getArray('nonexists'), [], 'should be empty array on undefined');
        });

        it('#getArray() on Object', function () {
            assert.deepEqual(config.getArray('c'), [ 'value d' ], 'should be array of object values');
        });
    });
});


