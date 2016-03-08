/*global io power color bulb changeBulbParams*/
var socket = io.connect()

socket.on('connect', function () {
  console.log('ws:// bulb is online')
  socket.emit('params', {
    power: power.value,
    color: color.value
  })
})

socket.on('disconnect', function () {
  console.log('ws:// connection with bulb lost')
})

socket.on('set', function (params) {
  changeBulbParams(params)
  socket.emit('params', params)
})

socket.on('on', function () {
  if (power.value === 'off') {
    bulb.onclick()
  }
})

socket.on('off', function () {
  if (power.value === 'on') {
    bulb.onclick()
  }
})

socket.on('get', function () {
  socket.emit('params', {
    power: power.value,
    color: color.value
  })
})
