var http = require('http')

var server = http.createServer().listen(8080, function () {
  console.log('Listening on port 8080...')
})

// Our server will handle the request as follow:
server.on('request', function (req, res) {
  res.write('Hello from Node.js fundamentals!\n')
  res.end()
})

// It also notify on server side when a connection occurs
server.on('connection', function (socket) {
  console.log('Hello from Node.js fundamentals! at server-side\n')
})
