#!/usr/bin/env node

/* Requires node.js libraries */
var io = require('socket.io')()
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// Netbeast apps need to accept the port to be launched by parameters
var argv = require('minimist')(process.argv.slice(2))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/api', require('./plugin')(io))

var server = app.listen(argv.port || 31416, function () {
  console.log('Bulb plugin listening at http://%s:%s',
  server.address().address,
  server.address().port)
})

// we need websockets to push updates to browser view
io.listen(server)
