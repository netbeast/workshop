var express = require('express')
var app = express()

// A request to IP:8000/ will be handled as follow:
app.get('/', function (req, res) {
  // using send we're using write + end in one line
  res.send('Hello from Netbeast workshop!')
})

app.listen(8000)
