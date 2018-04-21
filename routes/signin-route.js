'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');

  if (!authHeader) {
    res.send(400, 'Must provide a username/password');
  }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      if (user === null) {
        return res.send(400, 'user not found');
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          return res.send('Authentication failed: ' + err.message);
        }
        if (!isValid) {
          res.status(401).send('Not a valid password: ' + err);
          return;
        }
        return User.findOne({
          username: username
        })
    })
    .then((results) => {
      Song.find( {
        userId: results._id
      })
    .then((results) => {
      let payload = { userId: user._id };
      let token = jwt.sign(payload, process.env.SECRET);
      res.status(200).send({ auth: true, token: token , results});
    })
    .catch(err => res.send(err.message));
          });
      });
    });
});

module.exports = { router };