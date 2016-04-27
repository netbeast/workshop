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

/* TODO: */
var app = express()
var beast = require('netbeast')

// Netbeast apps need to accept the port to be launched by parameters
var argv = require('minimist')(process.argv.slice(2))

app.get(/* TODO: */, function (req, res, next) {
  var color = /* TODO: */ || 'FFFFFF'
  setColor(color)
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
  /*
   -------------------------------
   TODO:
        set color variable

              HERE

  --------------------------------
  */
}
