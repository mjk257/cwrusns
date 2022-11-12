const middleware = require("../middleware");
const sinon = require('sinon');
const User = require("../models/User")

const originalIsLoggedIn = middleware.isLoggedIn;
const loggedInStub = sinon.stub(middleware, 'isLoggedIn')

const request = require('supertest');
const app = require('../app');

describe('GET /recc not logged in', () => {
    it('Should render recc', () => {
        middleware.isLoggedIn.callsFake(originalIsLoggedIn);
        return request(app)
            .get("/reccomendations")
            .expect(200)
    })
})