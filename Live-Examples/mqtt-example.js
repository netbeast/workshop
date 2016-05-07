var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosca.io')

client.on('connect', function () {
  client.publish('meetup', Math.random().toFixed(5).toString())
  client.end()
})
