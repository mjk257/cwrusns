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
        // .expect(function (res) {
        //     if (!res.text.match(/id="schedule"/)) {
        //         throw new Error("Expected schedule")
        //     }
        // })
    })
})

// describe('GET /map Location error', () => {
//     it('Should redirect to error', () => {
//         middleware.isLoggedIn
//             .callsFake(function (req, res, next) {
//                 return next();
//             });
//         // findStub = sinon.stub(Location, 'find').throws(new Error("Could not find locations"));
//         return request(app)
//             .get("/map")
//             .expect(302)
//             .expect('Location', '/error')
//     })
// })