var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var coffeeScript = require('coffee-script');



function CoffeeScriptFilter(inputTree, options) {
    if (!(this instanceof CoffeeScriptFilter)) {
        return new CoffeeScriptFilter(inputTree, options)
    }
    Filter.call(this, inputTree, options);
    this.options = options || {"wrapper": false,"sourceMap": false,"header": ''};
}

CoffeeScriptFilter.prototype = Object.create(Filter.prototype)
CoffeeScriptFilter.prototype.constructor = CoffeeScriptFilter

CoffeeScriptFilter.prototype.extensions = ['coffee', 'cf']
CoffeeScriptFilter.prototype.targetExtension = 'js'

var coffeeScriptOptions = {
    bare: this.options.wrapper,
    sourceMap: this.options.sourceMap,
    header: this.options.header
}


CoffeeScriptFilter.prototype.processString = function(string, srcFile) {
    return new RSVP.Promise(function(resolve, reject) {
        try {
            resolve(coffeeScript.compile(string, coffeeScriptOptions));
        } catch (err) {
            reject(err);
        }
    }.bind(this));
}
module.exports = CoffeeScriptFilter
