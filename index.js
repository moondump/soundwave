'use strict';
const express = require('express');
const fs = require('fs');
const createuser = require('./lib/createuser');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + '/public'));

app.use('/signup', createuser);

app.get('/', function (req, res) {

  return res.redirect('/public/home.html');

});

app.get('/music', function (req, res) {

  let fileId = req.query.id;
  let file = __dirname + '/music/' + fileId;
  fs.exists(file, function (exists) {
    if (exists) {
      let rstream = fs.createReadStream(file);
      rstream.pipe(res);
    }
    else {
      res.send('Its a 404');
      res.end();
    }

  });
});

app.listen(PORT, function () {
  console.log('App listening on port 3000!');
});

