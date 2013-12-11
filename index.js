var Writable = require('stream').Writable;
var ansi = require('ansi');
var util = require('util');
var prettyjson = require('prettyjson');

var JokeCLI = module.exports = function (options) {
  if (!(this instanceof JokeCLI))
    return new JokeCLI(options);

  options = options || {};

  this.err = ansi(options.err || process.stderr);
  this.out = ansi(options.out || process.stdout);

  this.levels = {
    fatal: {
      stream: this.err,
      fg: '#ff0000'
    },
    error: {
      stream: this.err,
      fg: '#ff0000'
    },
    warn: {
      stream: this.err,
      fg: '#ffa500'
    },
    info: {
      stream: this.out
    },
    debug: {
      stream: this.out,
      fg: '#0070BB'
    }
  };

  Writable.call(this, { objectMode: true });
}
util.inherits(JokeCLI, Writable);

JokeCLI.prototype._write = function (chunk, enc, callback) {
  var options = this.levels[chunk.level];
  var stream;

  if (!options)
    return callback();

  stream = options.stream;

  if (options.fg)
    stream.hex(options.fg);
  stream.write(chunk.level.toUpperCase() + '\t[' + chunk.time.toGMTString() + ']: ');
  stream.write(chunk.message);
  stream.fg.reset();

  if (chunk.meta) {
    stream.write('\n');
    stream.write(prettyjson.render(chunk.meta).split('\n').map(function (l) { return '  ' + l; }).join('\n'));
  }
  stream.write('\n');

  callback();
};
