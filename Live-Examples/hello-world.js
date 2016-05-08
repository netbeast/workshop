var http = require('http')

/*
 http server is listening for a request and will send a message
 to the client browser
*/
http.createServer(function (req, res) {
  res.write('Hello from Node.js fundamentals!\n')
  res.end()
  // We can do in one line too: res.send('Hello from Node.js fundamentals!\n')
}).listen(8080, function () {
  // It`s the callback executed when server is listening on port 8080
  console.log('Listening on port 8080...')
})
