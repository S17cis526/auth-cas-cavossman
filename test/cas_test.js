var http = require('http');
var assert = require('assert');
var authCAS = require('../lib/auth-cas');
var config = require('./config.json');  // could make a test-config.json file specifically for testing

// Test hosts
it('A host must be specified', function() {
  assert.throws(
    () => {
      new authCAS();
	}, 
	/Host must be specified/
  );
  assert.throws(
    () => {
      new authCAS(undefined);
	}, 
	/Host must be specified/
  );
});
it('A CAS host must be specified', function(){
  assert.throws(
    () => {
      new authCAS('https://cashost.com');
	}, 
	/CAS host must be specified/
  );
});

// Test redirect
it('visiting login page sould redirect to the CAS server login page', function(done){
  http.get(config.host + '/login', function(res) {
	  assert.equals(res.statusCode, 302);
	  var redirect = url.parse(res.headers.location);
	  var expected = url.parse(config.casHost);
	  var service = encodeURIComponent(config.hsot + '/login');
	  assert.equal(location.protocol, expected.protocol);
	  assert.equal(location.port, expected.port);
	  assert.equal(location.pathname, './login');
	  assert.equal(location.search, '?service=' + service);
  }
});