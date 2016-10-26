'use strict';

const assert = require('assert');
const config = require('../lib/Confenv.js');



describe('Confenv', function () {
    it('#read()', function () {
        config.read('test/.env');
    });

    it('#get() ignore commented', function () {
        assert.equal(config.get('a'),  undefined, 'should be undefined if commented');
    });

    it('#get() string value', function () {
        assert.equal(config.get('b'), 'value b', 'should be value b');
    });

    it('#get() object value', function () {
        assert.deepEqual(config.get('c'), { d: 'value d' }, 'should be Object d: value d');
    });

    it('#get() ignore commented part', function () {
        assert.equal(config.get('e'), 'value e', 'should be value e without comment part');
    });

    it('#getAll()', function () {
        let obj = {
            b: 'value b',
            c: {
                d: 'value d'
            },
            e: 'value e'
        };
        assert.deepEqual(config.getAll(), obj, 'should be object of all params');
    });


});
