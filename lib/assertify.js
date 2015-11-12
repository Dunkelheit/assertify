'use strict';

// TODO: Cleanup

var identifierRegEx = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;

function escapeIdentifier(identifier) {
    return identifier.match(identifierRegEx) !== null ? '.' + identifier : '[\'' + identifier + '\']';
}

function line(path, rest, options) {
    var line = 'chai.expect(' + path + ').' + rest + ';';
    if (options.console) {
        typeof options.console === 'function' ? options.console(line) : console.log(line);
    }
    return line + '\n';
}

function generate(item, path, key, options) {
    var value = key ? item[key] : item;

    var response = '';

    var includeTypes = options.includeTypes !== false;

    if (Array.isArray(value)) {
        if (includeTypes) {
            response += line(path, 'to.be.an(\'array\')', options);
        }
        response += line(path, 'to.have.length(' + value.length + ')', options);
    } else if (typeof value === 'object') {
        if (includeTypes) {
            response += line(path, 'to.be.an(\'object\')', options);
        }
        response += line(path, 'to.have.keys(\'' + Object.keys(value).join('\', \'') + '\')', options);
    } else if (typeof value === 'number') {
        if (includeTypes) {
            response += line(path, 'to.be.a(\'number\')', options);
        }
        response += line(path, 'to.be.eql(' + value + ')', options);
    } else if (typeof value === 'string') {
        if (includeTypes) {
            response += line(path, 'to.be.a(\'string\')', options);
        }
        response += line(path, 'to.be.eql(\'' + value.replace('\'', '\\\'') + '\')', options);
    } else if (typeof value === 'boolean') {
        if (includeTypes) {
            response += line(path, 'to.be.a(\'boolean\')', options);
        }
        response += line(path, 'to.be.eql(' + value + ')', options);
    } else {
        response += line(path, '???', options)
    }

    return response;
}

function assertify(item, path, options) {
    var response = '';

    if (!options) {
        options = path || {};
        path = options.variableName || 'var';
        response += generate(item, path, undefined, options);
    }

    Object.keys(item).forEach(function (key) {
        if (typeof item[key] === 'object') {
            if (Array.isArray(item)) {
                return response += assertify(item[key], path + '[' + key + ']', options);
            }
            response += generate(item, path + escapeIdentifier(key), key, options);
            return response += assertify(item[key], path + escapeIdentifier(key), options);
        } else {
            if (Array.isArray(item)) {
                response += generate(item, path + '[' + key + ']', key, options);
            } else {
                response += generate(item, path + escapeIdentifier(key), key, options);
            }
        }
    });

    return response;
}

module.exports = assertify;