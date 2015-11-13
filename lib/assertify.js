'use strict';

/**
 * @typedef {object} AssertifyOptions
 * @property {string} [options.variableName=foo] - Name of the variable we are assertifying.
 * @property {boolean} [options.includeTypes=false] - Options object.
 * @property {boolean|function} [options.console] - Options object.
 */

/**
 * Used to identify property names that need to be surrounded with quotes.
 *
 * @type {RegExp}
 */
var identifierRegEx = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;

/**
 * Generates the path to a specific property.
 *
 * @private
 * @param {*} item - Whatever we are assertifying.
 * @param {string|undefined} path - Path to the item being assertified.
 * @param {string|number} key - Property we are building the path of.
 * @returns {string}
 */
function buildPath(item, path, key) {
    if (Array.isArray(item)) {
        return path + '[' + key + ']';
    } else {
        return path + (key.match(identifierRegEx) !== null ? '.' + key : '[\'' + key + '\']');
    }
}

/**
 * Writes a single assertion.
 *
 * @private
 * @param {string|undefined} path - Path to the item being assertified.
 * @param {string} rest - The rest of the assertion.
 * @param {AssertifyOptions} options - Options object.
 * @returns {string}
 */
function writeAssertion(path, rest, options) {
    var line = 'chai.expect(' + path + ').' + rest + ';';
    if (options.console) {
        if (typeof options.console === 'function') {
            options.console(line);
        } else {
            console.log(line);
        }
    }
    return line + '\n';
}

/**
 * Writes one or more assertions for a specific value.
 *
 * @private
 * @param {*} item - Whatever we are assertifying.
 * @param {string|undefined} path - Path to the item being assertified.
 * @param {string|number} key - Property we are building the path of.
 * @param {AssertifyOptions} options - Options object.
 * @returns {string}
 */
function writeAssertions(item, path, key, options) {
    var value = key ? item[key] : item;

    var response = '';

    var includeTypes = options.includeTypes !== false;

    if (Array.isArray(value)) {
        if (includeTypes) {
            response += writeAssertion(path, 'to.be.an(\'array\')', options);
        }
        response += writeAssertion(path, 'to.have.length(' + value.length + ')', options);
    } else if (typeof value === 'object') {
        if (includeTypes) {
            response += writeAssertion(path, 'to.be.an(\'object\')', options);
        }
        response += writeAssertion(path, 'to.have.keys(\'' + Object.keys(value).join('\', \'') + '\')', options);
    } else if (typeof value === 'number') {
        if (includeTypes) {
            response += writeAssertion(path, 'to.be.a(\'number\')', options);
        }
        response += writeAssertion(path, 'to.be.eql(' + value + ')', options);
    } else if (typeof value === 'string') {
        if (includeTypes) {
            response += writeAssertion(path, 'to.be.a(\'string\')', options);
        }
        response += writeAssertion(path, 'to.be.eql(\'' + value.replace('\'', '\\\'') + '\')', options);
    } else if (typeof value === 'boolean') {
        if (includeTypes) {
            response += writeAssertion(path, 'to.be.a(\'boolean\')', options);
        }
        response += writeAssertion(path, 'to.be.eql(' + value + ')', options);
    }

    return response;
}

/**
 * The main function.
 *
 * @param {*} item - Whatever we are going to assertify.
 * @param {string|undefined} path - Path to the item being assertified.
 * @param {AssertifyOptions} options - Options object.
 * @returns {string} - Assertions for the current item.
 */
function assertify(item, path, options) {
    var response = '';

    if (!options) {
        options = path || {};
        path = options.variableName || 'foo';
        response += writeAssertions(item, path, undefined, options);
    }

    Object.keys(item).forEach(function (key) {
        var valuePath = buildPath(item, path, key);
        if (typeof item[key] === 'object') {
            if (Array.isArray(item)) {
                return response += assertify(item[key], valuePath, options);
            }
            response += writeAssertions(item, valuePath, key, options);
            return response += assertify(item[key], valuePath, options);
        } else {
            response += writeAssertions(item, valuePath , key, options);
        }
    });

    return response;
}

module.exports = assertify;