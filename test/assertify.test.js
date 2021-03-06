'use strict';

var chai = require('chai');

var assertify = require('../lib/assertify');

var foo = {
    stores: {
        total: 3,
        offset: 0,
        data: [{
            id: '3605',
            name: 'Fnac Preciados',
            street: 'Calle Preciados, 28',
            zip: '28013',
            city: 'Madrid',
            latitude: 40.419027,
            longitude: -3.705254,
            openingTimes: [{
                date: 1439456166345,
                time: '08:00 - 20:00',
                today: true
            }],
            type: 'store',
            homeStore: false,
            newStore: true
        }, {
            id: '4670',
            name: 'Tattoo Joris & Co. Electric Tattooing',
            street: 'Kerkstraat 153',
            zip: '1017 GG',
            city: 'Amsterdam',
            latitude: 52.363600,
            longitude: 4.888569,
            openingTimes: [{
                date: 1439456166345,
                time: '08:00 - 21:00',
                today: true
            }],
            type: 'store',
            homeStore: true,
            newStore: false
        }]
    },
    filters: {
        data: [{
            type: 'quickfilter',
            items: [{
                id: 'openNow',
                title: 'Open now'
            }, {
                id: 'openSunday',
                title: 'Open on Sunday'
            }]
        }, {
            title: 'Filter on closing time',
            type: 'group',
            items: [{
                id: 'openUntil19',
                title: 'Open until 19:00'
            }, {
                id: 'openUntil20',
                title: 'Open until 20:00'
            }, {
                id: 'openUntil21',
                title: 'Open until 21:00'
            }, {
                id: 'openUntil22',
                title: 'Open until 22:00'
            }]
        }]
    },
    'meta-data': {
        'session identifier': 'Y119310803'
    }
};

describe('Assertify', function () {

    it('Generates valid assertions for a complex object', function (done) {
        var assertions = assertify(foo, {
            variableName: 'foo'
        });

        var assert = new Function('chai', 'foo', assertions);
        assert(chai, foo);
        done();
    });


    describe('Configuration', function () {

        it('Skips assertifying types', function (done) {
            var assertions = assertify(foo, {
                variableName: 'foo',
                includeTypes: false
            });

            var assert = new Function('chai', 'foo', assertions);
            assert(chai, foo);
            done();
        });

        it('Allows printing with console.log', function (done) {
            var assertions = assertify(foo, {
                variableName: 'foo',
                console: true
            });

            var assert = new Function('chai', 'foo', assertions);
            assert(chai, foo);
            done();
        });

        it('Allows custom printing', function (done) {
            var assertions = assertify(foo, {
                variableName: 'foo',
                console: console.error
            });

            var assert = new Function('chai', 'foo', assertions);
            assert(chai, foo);
            done();
        });

        it('Defaults the variable name to "foo"', function (done) {
            var assertions = assertify(foo);
            console.log(assertions);
            var assert = new Function('chai', 'foo', assertions);
            assert(chai, foo);
            done();
        });

    });
});
