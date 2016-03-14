var socket = io.connect({path: '/i/bulb-plugin'})

socket.on('connect', function () {
  console.log('ws:// bulb is online')
})

socket.on('disconnect', function () {
  console.log('ws:// connection with bulb lost')
})

socket.on('set', function (params) {
  changeBulbParams(params)
})

socket.on('on', function () {
  if (bulbState === 'off') {
    bulb.onclick()
  }
})

socket.on('off', function () {
  if (bulbState === 'on') {
    bulb.onclick()
  }
})

socket.on('get', function () {
  socket.emit('params', {
    power: bulbState,
    brightness: brightness.value,
    color: color.value
  })
})
