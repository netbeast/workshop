const http = require('http')

http.createServer(function (req, res) {
  // req is an http.IncomingMessage, which is a Readable Stream
  // res is an http.ServerResponse, which is a Writable Stream

  var body = ''
  // we want to get the data as utf8 strings
  // If you don't set an encoding, then you'll get Buffer objects
  req.setEncoding('utf8')

  // Readable streams emit 'data' events once a listener is added
  req.on('data', function (chunk) {
    body += chunk
  })

  // the end event tells you that you have entire body
  req.on('end', function () {
    console.log(body)
  })

  res.end(body)
}).listen(8080)
