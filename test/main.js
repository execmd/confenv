'use strict';

const assert = require('assert');
const config = require('../lib/Confenv.js');



describe('Confenv', function () {
    it('#read()', function () {
        config.read('test/.env');

        assert.equal(config.get('a'),  undefined, 'should be undefined if commented');
        assert.equal(config.get('b'), 'value b', 'should be value b');
        assert.deepEqual(config.get('c'), { d: 'value d' }, 'should be Object d: value d');
        assert.equal(config.get('e'), 'value e', 'should be value e without comment part');
    });

});
