/* eslint-disable */
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();

chai.use(chaiHttp)

describe('Search', function () {

    it('should list ALL equipment on /api/search GET', function(done) {
        chai.request(server).get('/api/search').end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
    })

    it('should list ALL users on /api/users GET', function(done) {
        chai.request(server).get('/api/users').end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
    })

    it('should list ALL requests on /api/requests GET', function(done) {
        chai.request(server).get('/api/requests').end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
    })

    it('should list ALL announcements on /api/announcements GET', function(done) {
        chai.request(server).get('/api/announcements').end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
    })

})
