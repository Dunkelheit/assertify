'use strict';

function line(path, rest) {
    console.log('chai.expect(' + path + ').' + rest + ';');
}

function generate(item, path, key) {
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
}

function assertify(item, path) {
    if (!path) {
        path = 'var';
        generate(item, path);
    }

    Object.keys(item).forEach(function (key) {
        if (typeof item[key] === 'object') {
            if (Array.isArray(item)) {
                return assertify(item[key], path + '[' + key + ']');
            }
            generate(item, path + '.' + key, key);
            return assertify(item[key], path + '.' + key);
        } else {
            if (Array.isArray(item)) {
                generate(item, path + '[' + key + ']', key);
            } else {
                generate(item, path + '.' + key, key);
            }
        }
    });
}

module.exports = assertify;