#!/usr/bin/env node

// server.js
// ==========

/*
* This is where all the magic happens.
* The Netbeast dashboard calls this script as is
* `node server.js --port <free port number>`
* after that everyline here will be executed.
*
* You can install extra modules thanks to the work
* of npm. Also you can create a shell script to
* install any missing system package.
*/

/* Requires node.js libraries */

// This is where dashboard is running
process.env.NETBEAST = 'localhost:8000'

var express = require('express')
var app = express()
var beast = require('netbeast')
var sleep = require('sleep')

// Netbeast apps need to accept the port to be launched by parameters
var argv = require('minimist')(process.argv.slice(2))

app.get('/bulb/', function (req, res, next) {
  var color = req.query.color || 'FFFFFF'
  setColor(color)

  sleep.sleep(1)
  Off()
  sleep.sleep(1)
  On()
/*  beast('lights').get()
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    if (error) throw error
  }) */
  next()
})

app.get('/', function (req, res, next) {
  res.redirect('/bulb')
  next()
})

app.use('/bulb', express.static('public'))

var server = app.listen(argv.port || 31416, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s/bulb', host, port)
})

function setColor (color) {
  beast('lights').set({color: '#' + color.toString()})
}

function Off () {
  beast('lights').set({
          power: "off"
        })
}
function On () {
  beast('lights').set({
          power: "on"
        })
}
