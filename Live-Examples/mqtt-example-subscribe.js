var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosca.io')

client.on('connect', function () {
  client.subscribe('meetup')
})

client.on('message', function (topic, message) {
  console.log(message.toString())
})
