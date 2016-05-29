var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  fs.readFile(/* GAP 1 */, function (err, data) {
    if (err) throw err
    /*
      GAP 2
    */
  })
}).listen(8000, function () {
  console.log('Listening on port 8000...')
})

server.on(/* GAP 3 */, function (socket) {
  console.log('Remote address is: ' +
  /* GAP 4 */ +
  ', and remote port:' +
  /* GAP 5*/)
})

/*
  You must add some code depending on the gap:

    - GAP 1: The file that you want to read. Have a look on where is located

    - GAP 2: Send the data to the client over response stream.

    - GAP 3: What event do you want to handle?

    - GAP 4 & GAP 5: How you can access to the info that you want to print?
*/
