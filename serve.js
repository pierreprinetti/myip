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
        res.end('Internal server error.\n');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write('Your IP: ' + callerIp + '\n');
        res.write('Reverse DNS: ' + domains + '\n');
        res.end();
      }
    });
  })
  .listen(8080, 'localhost');
console.log('Server running at localhost:8080');
