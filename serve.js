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

      dns.reverse(callerIp[0], function(err, domains) {
        if (err) {
          res.write('Error while getting the reverse DNS for ' + callerIp[0] + '.\n');
        } else {
          res.write('Reverse DNS for ' + callerIp[0] + ': ' + domains + '\n');
        }
        if (callerIp.length > 1) {
          dns.reverse(callerIp[1], function(err, domains) {
            if (err) {
              res.write('Error while getting the reverse DNS for ' + callerIp[1] + '.\n');
            } else {
              res.write('Reverse DNS for ' + callerIp[1] + ': ' + domains + '\n');
            }
          });
        }
        res.end();
      });
    }
  })
  .listen(8080, 'localhost');
console.log('Server running at localhost:8080');
