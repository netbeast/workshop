#! env/bash/node
var fs = require('fs')

// ------------------------- BLOCKING CODE -------------------------------
var content = fs.readFileSync('/etc/hosts')
console.log(content)
console.log('Doing something else!')
// -----------------------------------------------------------------------

// ------------------------- NON BLOCKING --------------------------------

fs.readFile('/etc/hosts', function (err, contents) {
  if (err) throw err
  console.log(content)
})
console.log('Doing something else!')
// -----------------------------------------------------------------------
