"use strict";

/* eslint-env node */

var http = require("http");
var fs = require("fs");

var stream = null;

function notFound (req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.end("Not found");
}

var index = fs.readFileSync("index.html");
function homepage (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(index);
}

function upload (req, res) {
  stream = req;

  req.on("end", function () {
    res.end();
  });
}

function download (req, res) {
  if (!stream) {
    return notFound(req, res);
  }

  stream.pipe(res);
}

var server = http.createServer(function (req, res) {
  var url = req.method + " " + req.url;
  if (url === "POST /upload") {
    upload(req, res);
  } else if (url.match(/^GET \/download\//)) {
    download(req, res);
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
