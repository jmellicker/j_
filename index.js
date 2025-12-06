/* eslint-disable security/detect-object-injection */
// More info about Object Injection
// https://github.com/nodesecurity/eslint-plugin-security/blob/master/docs/the-dangers-of-square-bracket-notation.md

const stringOps = require('./lib/string')
const quoteOps = require('./lib/quote')
const arrayOps = require('./lib/array')
const objectOps = require('./lib/object')
const randomOps = require('./lib/random')
const validationOps = require('./lib/validation')
const miscOps = require('./lib/misc')

const j_ = Object.assign(
    {},
    stringOps,
    quoteOps,
    arrayOps,
    objectOps,
    randomOps,
    validationOps,
    miscOps
)

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = j_
    }
    exports.j_ = j_
}
