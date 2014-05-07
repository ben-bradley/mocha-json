var fork = require('child_process').fork,
    fs = require('fs'),
    path = require('path');

module.exports = MochaJSON;

function MochaJSON(options) {

  this._bin = path.resolve(__dirname+'/node_modules/mocha/bin/mocha');

  this._files = (options && options.files) ?  // if files are specified,
    options.files :                           // assume the tester knows what they're doing,
    path.resolve(__dirname+'../../../test');  // else use the standard test dir

  this._arguments = [ '-R', 'json' ].concat(this._files);

  return this;

};

MochaJSON.prototype.run = function(callback) {

  var mocha = fork(this._bin, this._arguments, { silent: true });

  var logData = function(data) { this.log = (this.log||'') + data; };

  mocha.stdout.on('data', logData);
  mocha.stderr.on('data', logData);

  mocha.on('close', function() {
    var stdout = this.stdout.log;
    if (stdout) stdout = JSON.parse(stdout);
    callback(this.stderr.log, stdout);
  });

};
