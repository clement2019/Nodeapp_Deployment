var request = require('supertest');
var app = require('../index.js');
describe('GET /next', function() {
    it('respond with ayeni clement project', function(done) {
        request(app).get('/will').expect('{ "response": "ayeni clement project" }', done);
    });
});