var net = require('net');
var func = require('./functions.js');
var Ami = require('./ami.js');

var thread = {};
var _id = null;
var cmd = '';

var server = net.createServer(function(stream) {
  stream.setEncoding('utf-8');
  _id = stream.remotePort;
  console.log(func.formatedLog(_id, 'connected'));

  stream.on('connect', function() {
    var ami = new Ami('Asterisk Call Manager/1.1 #' + _id + '\r\n', '', '');
    stream.write(ami.title);
    thread[_id] = setInterval(function() {
      stream.write(ami.incoming('techsupport', '', '' , ''));
    }, 1000);
  });

  stream.on('data', function(data) {
    data = data.replace(/(\r\n|\n|\r)/gm,"");
    cmd = data;
    console.log(data);
  });

  stream.on('end', function() {
    _id = stream._peername.port;
    console.log(func.formatedLog(_id, 'end'));
    clearInterval(thread[_id]);
  });

  stream.on('close', function() {
    _id = stream._peername.port;
    console.log(func.formatedLog(_id, 'close'));
    clearInterval(thread[_id]);
  });
});

server.listen(1234, function() {
  console.log('Asterisk Call Manager/1.1');
});
