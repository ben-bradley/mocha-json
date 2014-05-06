/*
 * Requires that Mocha be in your PATH
 *
 */

var spawn = require('child_process').spawn;

module.exports = function(opts, callback) {
  var _stdout, _stderr, _this;

  if (typeof opts == 'string')
    throw new Error('mocha-json expects array as first argument');

  // frontload the json reporter options
  opts.unshift('-R', 'json');

  _this = spawn('mocha', opts);

  _this.stdout.on('data', function(data) { _stdout = (_stdout||'') + data; });
  
  _this.stderr.on('data', function(data) { _stderr = (_stderr||'') + data; });
  
  _this.on('close', function() {
    if (_stdout) _stdout = JSON.parse(_stdout);
    callback(_stderr, _stdout);
  });
  
};
