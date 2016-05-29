var express = require('express')
var app = express()

/*
    GAP 1
*/

/*
    GAP 2
*/

app.get('*', function (req, res) {
  /* GAP 3 */
})

app.listen(8000)

/*
  You must add some code depending on the gap:
    GAP 1:  GET requests to /path1 must be handled sending 'This is path1!'
            over response.

    GAP 1:  GET requests to /path2 must be handled sending 'This is path2!'
            over response.

    GAP 3: Response with status code
*/
