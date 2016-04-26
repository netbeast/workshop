var express = require('express')
var app = express()

app.get('/path1', function (req, res) {
  res.send('This is path1!')
})

app.get('/path2', function (req, res) {
  res.send('This is path2!')
})

app.get('*', function (req, res) {
  res.sendStatus(403)
})

app.listen(8000)
