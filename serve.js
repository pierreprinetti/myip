var dns = require('dns');
var http = require('http');

http.createServer(function(req, res) {
  var callerIp = req.headers['x-forwarded-for']
  console.log('Serving request from', callerIp)

  dns.reverse(callerIp, function(err, domains) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Internal server error.');
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('Your IP:', callerIp);
      res.write('Reverse DNS:', JSON.stringify(domains));
      res.end();
    }
  });
});
