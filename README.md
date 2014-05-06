mocha-json
==========

A simple wrapper to capture JSON output from Mocha and make it available to code.

Example
=======
```javascript
var express = require('express'),
    app = express();
    
var mochaJson = require('mocha-json');

app.get('/test/all', function(req, res) {
  mochaJson([ './test' ], function(err, json) {
    res.send(json);
    /* response is the JSON produced by Mocha that would otherwise get dumped to stdout */
  });
});

app.get('/test/:file', function(req, res) {
  mochaJson([ './test/'+req.params.file+'.js' ], function(err, json) {
    res.send(json);
    /* response is the JSON produced by Mocha that would otherwise get dumped to stdout */
  });
});

app.listen(8080);
```

Notes
=====
http://visionmedia.github.io/mocha/ FTW!
