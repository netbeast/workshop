var express = require('express')
var app = express()

// A request to IP:8000/ will be handled as follow:
app.get('/', function (req, res) {
   res.send('Hello from Netbeast workshop!')
})

app.listen(8000)
