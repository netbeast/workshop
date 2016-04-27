#!/usr/bin/env node

var express = require('express')
var app = express()
var http = require('http')
var mqtt = require('mqtt')
/* TODO: connect to Netbeast IP:PORT with mqtt */
const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e986e8b23ff33bc562d75ce3c332cbda'

function checkTemp () {
  http.get(url, function (response) {
    var body = ''

    response.on('data', function (chunk) {
      body += chunk
    })

    response.on('end', function () {
      var data = JSON.parse(body)
      if (toCelsius(data.main.temp) > 1) {
        /*
            TODO: handle temperature
        */
      }
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
  /*
    TODO: check and publish the temperature each X seconds (X is all up to you)
  */
})
