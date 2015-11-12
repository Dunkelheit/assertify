'use strict';

function iterate(item, path, callback) {
    if (typeof path === 'function') {
        callback = path;
        path = 'var';
        callback(item, path);
    }

    Object.keys(item).forEach(function (key) {
        if (typeof item[key] === 'object') {
            if (Array.isArray(item)) {
                return iterate(item[key], path + '[' + key + ']', callback);
            }
            callback(item, path + '.' + key, key);
            return iterate(item[key], path + '.' + key, callback);
        } else {
            if (Array.isArray(item)) {
                callback(item, path + '[' + key + ']', key);
            } else {
                callback(item, path + '.' + key, key);
            }
        }
    });
}

iterate({
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
    }
}, function (item, path, key) {
    var value = key ? item[key] : item;

    if (Array.isArray(value)) {
        line(path, 'to.be.an(\'array\')');
        line(path, 'to.have.length(' + value.length + ')');
    } else if (typeof value === 'object') {
        line(path, 'to.be.an(\'object\')');
        line(path, 'to.have.keys(\'' + Object.keys(value).join('\', \'') + '\')');
    } else if (typeof value === 'number') {
        line(path, 'to.be.a(\'number\')');
        line(path, 'to.be.eql(' + value + ')');
    } else if (typeof value === 'string') {
        line(path, 'to.be.a(\'string\')');
        line(path, 'to.be.eql(\'' + value.replace('\'', '\\\'') + '\')');
    } else if (typeof value === 'boolean') {
        line(path, 'to.be.a(\'boolean\')');
        line(path, 'to.be.eql(\'' + value + '\')');
    } else {
        line(path, '???')
    }

});

function line(path, rest) {
    console.log('chai.expect(' + path + ').' + rest + ';');
}

exports.assertify = iterate;