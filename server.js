"use strict";

/* eslint-env node */

var http = require("http");
var fs = require("fs");
var uuid = require("uuid");

var streams = {};

function notFound (req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.end("Not found");
}

var index = fs.readFileSync("index.html");
function homepage (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(index);
}

function generateUploadId (req, res) {
  res.writeHead(201, {"Content-Type": "text/plain"});
  res.end(uuid());
}

function upload (req, res, id) {
  streams[id] = req;

  req.on("end", function () {
    delete streams[id];
    res.end();
  });
}

function download (req, res, id) {
  if (!streams[id]) {
    return notFound(req, res);
  }

  streams[id].pipe(res);
}

var server = http.createServer(function (req, res) {
  var url = req.method + " " + req.url;
  if (url.match(/^POST \/upload\//)) {
    upload(req, res, req.url.substring(8).replace(/\/.*$/, ""));
  } else if (url === "GET /upload-id") {
    generateUploadId(req, res);
  } else if (url.match(/^GET \/download\//)) {
    download(req, res, req.url.substring(10).replace(/\/.*$/, ""));
  } else if (url === "GET /") {
    homepage(req, res);
  } else {
    notFound(req, res);
  }
});

server.listen(8000);

server.on("listening", function () {
  console.log("ready", server.address());
});
