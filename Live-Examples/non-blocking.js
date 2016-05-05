var fs = require('fs')

// ------------------- NON-BLOCKING

fs.readFile('../README.md', function (err, asyncData) {
  if (err) throw err
    console.log('1 ------------\n' + asyncData.toString())
})
fs.readFile('sampleFile', function (err, asyncData) {
  if (err) throw err
    console.log('2 ------------\n' + asyncData.toString())
})
