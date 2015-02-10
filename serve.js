var dns = require('dns');
var http = require('http');

http.createServer(function(req, res) {
    var d = new Date();
    var callerStr = req.headers['x-forwarded-for']
    console.log(d.toJSON(), 'Serving request from', callerStr);

    if (typeof callerStr === "undefined") {
      res.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8"'
      });
      res.end("Unable to get caller IP.\n");
    } else {
      var callerIp = callerStr.split(', ')
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8"'
      });

      callerIp.forEach(function(caller) {
        console.log("Trying to reverse", caller)
        dns.reverse(caller, function(err, domains) {
          if (err) {
            res.write('Error while getting the reverse DNS for ' + caller + '.\n');
          } else {
            res.write('Reverse DNS for ' + caller + ': ' + domains + '\n');
          }
        });
      });
      res.end("\n");
    }
  })
  .listen(8080, 'localhost');
console.log('Server running at localhost:8080');
