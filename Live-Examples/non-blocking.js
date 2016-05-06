var fs = require('fs')

// ------------------- NON-BLOCKING

fs.readFile('../README.md', function (err, asyncData) {
  if (err) throw err
  console.log('1 ------------\n' + asyncData.toString())
})

console.log('\n\n################\n I am in the middle! is it blocked? \n################\n\n')

fs.readFile('sampleFile', function (err, asyncData) {
  if (err) throw err
  console.log('2 ------------\n' + asyncData.toString())
})
