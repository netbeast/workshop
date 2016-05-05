var fs = require('fs')

var syncData1
var syncData2

syncData1 = fs.readFileSync('../README.md').toString()
syncData2 = fs.readFileSync('sampleFile').toString()
console.log('1 ---------\n' + syncData1)
console.log('2 ---------\n' + syncData2)
