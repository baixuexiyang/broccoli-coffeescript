'use strict'
/**
 * test compile coffeescript
 * @type {[type]}
 */
var coffeescript = require('./');
var fixture = require('broccoli-fixture');
var chai = require('chai'),
	expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('broccoli-coffee', function() {
	var options;
	before(function() {
		options = {"wrapper": false,"sourceMap": false,"header": ''};
	});
	it('compiles .coffee or .cf files', function() {
		var inputNode = new fixture.Node({
			'test.coffee': 'console.log "Hello world"'
		})
		return expect(fixture.build(new BroccoliCoffee(inputNode, options))).to.eventually.deep.equal({
			'test.js': '(function() {\n  console.log(\"Hello world\");\n\n}).call(this);\n'
		})
	})
})
