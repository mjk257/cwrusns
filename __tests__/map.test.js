const middleware = require("../middleware");
const sinon = require('sinon');
const User = require("../models/User")
const Location = require("../models/location");

const originalIsLoggedIn = middleware.isLoggedIn;
const loggedInStub = sinon.stub(middleware, 'isLoggedIn')

const request = require('supertest');
const app = require('../app');

describe('GET /map not logged in', () => {
    it('Should render map', () => {
        middleware.isLoggedIn.callsFake(originalIsLoggedIn);
        return request(app)
            .get("/map")
            .expect(200)
    })
})

describe('GET /map logged in', () => {
    it('Should render map with schedule', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/map")
            .expect(200)
            .expect(function (res) {
                if (res.text.match(/id="schedule"/)) {
                    throw new Error("Expected schedule")
                }
            })
    })
})

describe('GET /map Location error', () => {
    it('Should redirect to error', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/map")
            .expect(302)
            .expect('Location', '/error')
    })
})

describe('GET /map/:id', () => {
    it('Should render map with valid id', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/map/636d7780ead809b722495f18")
            .expect(200)
    })

    it('Should redirect to error with invalid id', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/map/invalid")
            .expect(302)
            .expect('Location', '/error')
    })

})

describe('GET /day/:day', () => {
    it('Should render map with valid day', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/map/day/1")
            .expect(200)
    })

    it('Should redirect to error with invalid day', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/map/day/invalid")
            .expect(302)
            .expect('Location', '/error')
    })
})

describe('POST /map', () => {
    it('Should render map with valid body', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .post("/map")
            .send({
                destination: 'Kent Hale Smith'
            })
            .expect(200)
    })

    it('Should redirect to error with invalid body', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .post("/map")
            .send({
                destination: 'Error'
            })
            .expect(302)
            .expect('Location', '/error')
    })
})