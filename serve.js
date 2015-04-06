var config = require('./config')
var express = require('express');
var dns = require('dns');

var app = express();
app.disable('x-powered-by');

app.get('/', function(req, res) {
  var d = new Date();
  var callerStr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
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

var d = new Date();
app.listen(config.listenToPort);
console.log(d.toJSON(), 'Server running at localhost:' + config.listenToPort);
