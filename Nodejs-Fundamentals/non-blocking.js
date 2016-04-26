var fs = require('fs')

// ------------------ BLOCKING

var syncData = fs.readFileSync('README.md').toString()
console.log(syncData)
console.log('It is blocked')

// ------------------- NON-BLOCKING

fs.readFile('README.md', function (err, asyncData) {
  if (err) throw err
  console.log(asyncData.toString())
})
console.log('It is not blocked')
