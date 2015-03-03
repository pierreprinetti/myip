var assert = require('assert');
var request = require('request');
var app = require('../serve');

describe('MyIp', function() {
	before(function() {
		// The before() callback gets run before all tests in the suite. Do one-time setup here.
	});
	beforeEach(function() {
		// The beforeEach() callback gets run before each test in the suite.
	});
	it('should serve a correctly formatted JSON', function(done) {
		// Now... Test!
		request('http://127.0.0.1:8080/', function(err, res, body) {
			var data = JSON.parse(body);
			var expectedIp = '127.0.0.1';
			assert.equal(data.ip, expectedIp);
			done(err);
		});
	});
	// it('chains ')
	after(function() {
		// after() is run after all your tests have completed. Do teardown here.
	});
});
