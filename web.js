var express = require('express'),
    packageInfo = require('./package.json'),
    app = express(),
    server, host, port;

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

server = app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
  host = server.address().address;
  port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});
