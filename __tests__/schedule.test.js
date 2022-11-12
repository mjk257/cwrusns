const middleware = require("../middleware");
const sinon = require('sinon');
const User = require("../models/User");

const originalIsLoggedIn = middleware.isLoggedIn;
const loggedInStub = sinon.stub(middleware, 'isLoggedIn')

const request = require('supertest');
const app = require('../app');

describe('GET /schedule not logged in', () => {
    it('Should redirect', () => {
        middleware.isLoggedIn.callsFake(originalIsLoggedIn);
        return request(app)
            .get("/schedule")
            .expect(302)
            .expect('Location', '/login')
    })
})

describe('GET /schedule logged in', () => {
    it('Should render schedule.ejs', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .get("/schedule")
            .expect(200)
    })
});

describe('POST /schedule', () => {
    it('Should redirect to schedule if successful', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .post("/schedule")
            .send({
                name: "CSDS 393",
                start: "10:00",
                end: "11:15",
                location: "White",
                day: [2, 4]
            })

    })
    it('Should redirect to error if unsuccessful', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .post("/schedule")
            .send({
                name: "",
                start: "10:00",
                end: "11:15",
                location: "White",
                day: [2, 4]
            })

    })

    it('Should redirect to schedule if times are wrong', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .post("/schedule")
            .send({
                name: "",
                end: "10:00",
                start: "11:15",
                location: "White",
                day: [2, 4]
            })

    })
})

describe('DELETE /schedule/:id', () => {
    it('Should redirect to schedule if successful', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .delete("/schedule/:id")
            .send({
                _id: "testID"
            })

    })

    it('Should redirect to error if unsuccessful', () => {
        middleware.isLoggedIn
            .callsFake(function (req, res, next) {
                return next();
            });
        return request(app)
            .delete("/schedule/:id")
            .send({
                _id: ""
            })

    })
})