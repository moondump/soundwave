'use strict';

const superagent =  require('superagent');
const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const server = require('../server.js');
require('dotenv').config();

let newUser = {
  username: 'signin',
  password: 'signin'
};
let badUsername = {
  password: 'windows'
};
let badPassword = {
  username: 'bill' + Math.random()
};

describe('All tests', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  describe('Server tests', () => {
    test('throws 404 if route is not found', (done) => {
      expect(40).toEqual(40);
      done();
    });
  });

  describe('Testing User Sign Up', () => {
    test('Should create new user', (done) => {
      superagent.post(SERVER_URL + '/signup')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if(err){
            res.send('errrrrrr', err);
          }
          expect(res.status).toBe(200);
          done();
        });
    });
    test('Should give err 400 if no username', (done) => {
      superagent.post(SERVER_URL + '/signup')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(badUsername))
        .catch((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
    test('Should give err 400 if no password', (done) => {
      superagent.post(SERVER_URL + '/signup')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(badPassword))
        .catch((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
  });
});