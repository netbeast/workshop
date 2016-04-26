var express = require('express')
var app = express()

app.get('/', function (req, res) {
   res.send('Hello from Netbeast workshop!')
})

app.listen(8000)
