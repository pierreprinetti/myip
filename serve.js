//var dns = require('dns');
var http = require('http');


http.createServer(function(req, res) {
  var callerIp = req.headers['X-Forwarded-For']
  console.log('Serving request from', callerIp)
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end(callerIp);
}).listen(8080, 'localhost');
console.log('Server running at localhost:8080');
/*
dns.resolve6('www.google.com', function(err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  addresses.forEach(function(a) {
    dns.reverse(a, function(err, domains) {
      if (err) {
        throw err;
      }

      console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
    });
  });
});
*/
