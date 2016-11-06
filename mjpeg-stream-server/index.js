#!/usr/bin/env node

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'p': 'port',
    'h': 'host'
  },
  default: {
    'port': 8042,
    'host': 'localhost'
  }
});

process.stdin.resume();

var boundary = 'Ba4oTvQMY8ew04N8dcnM'; // boundary string

app.use("/site", express.static(__dirname+'/site'));

app.get('/', function (req, res) {
  res.setHeader(
    'Content-Type',
    'multipart/x-mixed-replace;boundary=' + boundary
  );
  res.setHeader('Connection', 'close');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Expires', -1);
  res.setHeader('Max-Age', 0);

  process.stdin.pipe(res);
});

process.stdin.pipe(process.stdout);

server.listen(argv.port, argv.host);
