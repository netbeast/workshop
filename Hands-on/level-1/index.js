var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e986e8b23ff33bc562d75ce3c332cbda'

var http = require('http')

http.get(url, function (response) {
  var body = ''

  response.on('data', function (chunk) {
    body += chunk
  })

  response.on('end', function () {
    var data = JSON.parse(body)
    console.log(data.name + ', tempetature (Cº): ' + toCelsius(data.main.temp))
  })
})

function toCelsius (temp) {
  // return ((parseInt(temp, 10) - 32) * 5 / 9).toString()
  var kelvin = parseFloat(temp)
  return (kelvin - 273).toFixed(2).toString()
}
