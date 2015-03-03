var express = require('express');
var dns = require('dns');
var http = require('http');

var app = express();

app.get('/', function(req, res) {
  var d = new Date();
  var callerStr = req.headers['x-forwarded-for']
  console.log(d.toJSON(), 'Serving request from', callerStr);

  if (typeof callerStr === "undefined") {
    res.status(500).json({
      error: 'Unable to get caller IP.'
    });
  } else {
    var callerIp = callerStr.split(', ')[0]

    dns.reverse(callerIp, function(err, domains) {
      res.json({
        ip: callerIp,
        reverse: domains
      });
    });
  }
});

app.listen(8080, 'localhost');
console.log('Server running at localhost:8080');
