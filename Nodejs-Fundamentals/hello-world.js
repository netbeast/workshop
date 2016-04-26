var http = require('http')

http.createServer(function (req, res) {
  res.write('Hello from Node.js fundamentals!\n')
  res.end()
}).listen(8080, function () {
  console.log('Listening on port 8080...')
})
