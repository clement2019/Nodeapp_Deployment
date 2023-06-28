var request = require('supertest');
var app = require('../index.js');
describe('GET /next', function() {
    it('respond with ayeni clement project', function(done) {
        request(app).get('/will').expect('{ "response": "Yes! we are good to go" }', done);
    });
});