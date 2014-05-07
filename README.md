mocha-json
==========

A simple wrapper to capture JSON output from Mocha and make it available to code.

Install
=======
```
npm insatll git://github.com/ben-bradley/mocha-json
```

HowTo
=====
Requiring `mocha-json` provides access to a forked instance of the Mocha binary.  The returned method accepts an object that currently only uses the `files` attribute to select specific files to be added to the test run, this defaults to the `test/` directory.  By default, MochaJSON uses the binary installed when you ran `npm install git://github.com/ben-bradley/mocha-json` so while you can still install mocha globally, you don't have to for this module.

Requiring
---------
```javascript
var MochaJSON = require('mocha-json');
```

Declaring
---------
When you declare a `new MochaJSON` instance, you can specify which test files to run or accept the default of the `test/` directory.
```javascript
var mochaJSON = new MochaJSON(); // defaults
// or //
var mochaJSONFiles = new MochaJSON({ files: [ 'test/simple', 'test/simple2' ] });
```

Running
-------
Once you've got your test run set up, make it go! The `.run()` method accepts a callback that returns `err` and `json` output collected from Mocha.
```javascript
mochaJSON.run(function(err, json) { console.log(json); });
// or //
mochaJSONFiles.run(function(err, json) { console.log(json); });
```

Example
=======

Files
-----
```
index.js
test/
  simple.js
  simple2.js
  plan1/
    simple3.js
node_modules/
  ...
```

index.js
--------
```javascript
var express = require('express'),
    app = express();

var MochaJSON = require('mocha-json');

app.get('/test/all', function(req, res) {
  var mochaJSON = new MochaJSON();
  mochaJSON.run(function(err, json) {
    res.send(json);
  });
});

app.get('/test/:file', function(req, res) {
  var mochaJSON = new MochaJSON({ files: [ 'test/'+req.params.file ] });
  mochaJSON.run(function(err, json) {
    res.send(json);
  });
});

app.get(/^\/test\/(.+)/, function(req, res) {
  var mochaJSON = new MochaJSON({ files: [ 'test/'+req.params[0] ] });
  mochaJSON.run(function(err, json) {
    res.send(json);
  });
});

app.listen(8080);

```

Notes
=====
http://visionmedia.github.io/mocha/ FTW!
