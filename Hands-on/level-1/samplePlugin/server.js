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
var express = require('express')
var app = express()
var http = require('http')
var mqtt = require('mqtt')
var client = mqtt.connect('ws://localhost:8000') // Netbeast IP:PORT in your subnet
const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e986e8b23ff33bc562d75ce3c332cbda'

function publishTemp () {
  http.get(url, function (response) {
    var body = ''

    response.on('data', function (chunk) {
      body += chunk
    })

    response.on('end', function () {
      var data = JSON.parse(body)
      var info = data.name + ', tempetature (Cº): ' + toCelsius(data.main.temp)
      const msg = {title: 'weather', body: info, emphasis: 'info'}
      client.publish('netbeast/push', JSON.stringify(msg))
    })
  })
}

function toCelsius (temp) {
  var kelvin = parseFloat(temp)
  return (kelvin - 273).toFixed(2).toString()
}

// Netbeast apps need to accept the port to be launched by parameters
var argv = require('minimist')(process.argv.slice(2))

app.use(express.static('public'))

var server = app.listen(argv.port || 31416, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)

  setInterval(publishTemp, 100*1000)
})
