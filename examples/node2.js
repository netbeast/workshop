var http = require('http')

http.createServer(function (req, res) {
  res
    .writeHead(200)
    .write('Hello from Netbeast workshop')
    .end()
}).listen(8080, function () {
  console.log('Listening on port 8080')
})

/* Type:
    node node2.js
*/
