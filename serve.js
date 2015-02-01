var dns = require('dns');
var http = require('http');

http.createServer(function(req, res) {
    var callerIp = req.headers['x-forwarded-for']
    console.log('Serving request from', callerIp)

    dns.reverse(callerIp, function(err, domains) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('Your IP: ' + callerIp + '\n');
      if (err) {
        res.write('Error while getting the reverse DNS: ' + err + '\n');
      } else {
        res.write('Reverse DNS: ' + domains + '\n');
      }
      res.end();
    });
  })
  .listen(8080, 'localhost');
console.log('Server running at localhost:8080');
