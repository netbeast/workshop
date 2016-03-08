var express = require('express')
var request = require('superagent')
var colorsys = require('colorsys')

var router = express.Router()
var bulbParams // aux nasty way to transmit changes

var bulbvalues = {power: 'power', brightness: 'brightness', saturation: 'saturation', hue: 'hue'}

module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('ws:// bulb has connected to plugin')
    socket.on('params', function (params) {
      bulbParams = params
    })
    io.emit('get')
  })

  io.on('disconnection', function () {
    console.log('ws:// bulb has disconnected from plugin')
  })

  io.on('connect_failure', function (err) {
    console.log('ws:// connection failure')
    console.log(err)
  })

  request.get('http://' + process.env.NETBEAST + '/api/resources?app=bulb-plugin',
  function (err, resp, body) {
    if (err) return console.log(err)
    if (resp.body) return
    request.post('http://' + process.env.NETBEAST + '/api/resources')
    .send({ app: 'bulb-plugin', topic: 'lights', hook: '/api' })
    .end()
  })

  router.post('/', function (req, res) {
    io.emit('get')
    if (!Object.keys(req.body).length) return res.status(400).send('Incorrect set format')
    console.log('Plugin translates uniform req.body to bulb params...')
    var response = {}
    if (req.body.power) response.power = req.body.power

    if ('color' in req.body) {
      if (req.body.hue) delete req.body.hue
      if (req.body.saturation) delete req.body.saturation
      if (req.body.brightness) delete req.body.brightness
      if (typeof (req.body.color) === 'string') {
        var hsl = colorsys.hex2Hsl(req.body.color)
        response.hue = hsl.h
        response.saturation = hsl.s
        response.brightness = hsl.l
        response.color = req.body.color
      } else if (typeof (req.body.color) === 'object') {
        if (req.body.color.r || req.body.color.g || req.body.color.b) {
          var hsl = colorsys.rgb2Hsl(req.body.color.r, req.body.color.g, req.body.color.b)
          response.hue = hsl.h
          response.saturation = hsl.s
          response.brightness = hsl.l
          response.color = colorsys.rgb2Hex(req.body.color.r, req.body.color.g, req.body.color.b)
        } else {
          return res.status(400).send('Incorrect color format')
        }
      } else return res.status(400).send('Incorrect color format')
    } else {
      if (bulbParams) {
        var hsl = colorsys.hex2Hsl(bulbParams.color)
        response.hue = req.body.hue ? req.body.hue : hsl.h
        response.saturation = req.body.saturation ? req.body.saturation : hsl.s
        response.brightness = req.body.brightness ? req.body.brightness : hsl.l
        response.color = colorsys.hsl2Hex(response.hue, response.saturation, response.brightness)
      }
    }
    if (!response) return res.status(400).send('Incorrect set format')

    io.emit('set', {
      power: response.power || bulbParams.power,
      color: response.color || bulbParams.color
    })
    console.log('setting...')
    console.log({
      power: response.power || bulbParams.power,
      color: response.color || bulbParams.color
    })
    bulbParams = null
    res.send(response)
  })

  router.get('/', function (req, res) {
    io.emit('get')
    setTimeout(function () {
      if (bulbParams) {
        var hsl = colorsys.hex2Hsl(bulbParams.color)
        delete bulbParams.color
        bulbParams.hue = hsl.h
        bulbParams.saturation = hsl.s
        bulbParams.brightness = hsl.l

        if (!Object.keys(req.query).length) return res.json(bulbParams)

        var response = {}

        Object.keys(req.query).forEach(function (key) {
          if (key === 'color') {
            response['color'] = { hex: colorsys.hsl2Hex(hsl.h, hsl.s, hsl.l),
              rgb: colorsys.hsl2Rgb(hsl.h, hsl.s, hsl.l)
            }
          }
          if (bulbvalues[key]) response[key] = bulbParams[key]
        })
        bulbParams = null

        if (Object.keys(response).length) return res.json(response)
        return res.status(202).send('Values not available on this philips-hue bulb')
      } else {
        res.status(404).json('Device not found')
      }
    }, 3000)
  })

  router.get('/on', function (req, res) {
    io.emit('on')
    res.status(204).end()
  })

  router.get('/off', function (req, res) {
    io.emit('off')
    res.status(204).end()
  })

  return router
}

function _parseKeyPost (key, value) {
  if (key === 'hue') value > 65535 ? 65535 : value
  if (key === 'saturation' || key === 'brightness') value > 255 ? 255 : value
  value === 0 ? 0 : value
  return value
}
