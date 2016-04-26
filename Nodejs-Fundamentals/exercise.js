var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  fs.readFile('README.md', function (err, data) {
    if (err) throw err
    res.write(data)
    res.end()
  })
}).listen(8000, function () {
  console.log('Listening on port 8000...')
})

server.on('connection', function (socket) {
  console.log('Remote address is: ' +
  socket.remoteAddress.toString() +
  ', and remote port:' +
  socket.remotePort.toString())
})
