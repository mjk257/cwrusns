const middleware = require("../middleware");
const sinon = require('sinon');
const User = require("../models/User");
const Location = require("../models/location");

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

describe('Test compTime', () => {
    it('Should return proper difference with good input', () => {
        compTime(Date.now()).expect(0);
    })
})

describe('Test getNextClass', () => {
    const user = {
        "_id": {
            "$oid": "6392689e5dbd3c4b181afbd8"
        },
        "username": "mjk257@case.edu",
        "schedule": [{
            "days": [
                2,
                4
            ],
            "_id": {
                "$oid": "639268b55dbd3c4b181afbe0"
            },
            "name": "CSDS 393",
            "startTime": "10:00",
            "endTime": "11:15"
        }],
        "salt": "11921a5b10efecad8d9bbcb357e1adcecfe5a8343f0c22f6e7fff458d07b64b2",
        "hash": "670cf925b4375b7ae3e679594f15bbf9d2db9a7d9b75ee699a79d8ca948402d2608a5c9214761dede558cc3a41c0de79ff72771be38b3b32692729d3f6eb006063401f8038f878626778a2cc1bb36cbd920953f6f165900a3003610a6c95455e10f17fec3c54a995ec90381b458937ebb038f777c24ca8dd9f8cc30ff82b42161b2a15421664197e645d2307610d741962e7794dca415c4b479b0fa82137af42c0650c059b202fe2f3a596fa7cd2d60d23f363457e9255069ddbfba1758496c647e962cc1e11275ab5e1305462a795c5e29a39e887b85f762a0bb38566186c7a5544d6e2898972902f99bc35e322ef45379a17398f64a876d15cda5787d6b30a08c98420cc0134bb75293d81f4979fb75a48470b719b52bf8a4179fc34b28fefa402566ec685eda1230a6aa82937249d8239b3d31797e2815d17ff57b943911f09ee3934a9d0bd67d134a1b23d81c12e6d067b18057b88b9901f36871037589fca4149aabf29710769d5d20a8fe6fca1be2600ac42f40e24e56a2cbbf4dc1826678fc35fc872e04fbc955203c1c393e772993555a83207df3220d3e2c6e1cfb0ef7e55b178fa0c9fd85b01aeee511163de16ff374fa978775ab0af2f3b0f444b21b7b34d7bd23f1d5411fb2409b33f3746823847d62b956707fc6328a73deffe3f4d125199a551a3fd2de9cb4507d807568f001e847ac8f4d397c5867444a26a",
        "__v": 0
    };

    const course = {
        "days": [
            2,
            4
        ],
        "_id": {
            "$oid": "639268b55dbd3c4b181afbe0"
        },
        "name": "CSDS 393",
        "startTime": "10:00",
        "endTime": "11:15"
    }

    it('Should return next class', () => {
        getNextClass(user).expect(course);
    })

})

describe('Test shouldAdd', () => {
    const user = {
        "_id": {
            "$oid": "6392689e5dbd3c4b181afbd8"
        },
        "username": "mjk257@case.edu",
        "schedule": [{
            "days": [
                2,
                4
            ],
            "_id": {
                "$oid": "639268b55dbd3c4b181afbe0"
            },
            "name": "CSDS 393",
            "startTime": "10:00",
            "endTime": "11:15",
            "location": "White"
        }],
        "salt": "11921a5b10efecad8d9bbcb357e1adcecfe5a8343f0c22f6e7fff458d07b64b2",
        "hash": "670cf925b4375b7ae3e679594f15bbf9d2db9a7d9b75ee699a79d8ca948402d2608a5c9214761dede558cc3a41c0de79ff72771be38b3b32692729d3f6eb006063401f8038f878626778a2cc1bb36cbd920953f6f165900a3003610a6c95455e10f17fec3c54a995ec90381b458937ebb038f777c24ca8dd9f8cc30ff82b42161b2a15421664197e645d2307610d741962e7794dca415c4b479b0fa82137af42c0650c059b202fe2f3a596fa7cd2d60d23f363457e9255069ddbfba1758496c647e962cc1e11275ab5e1305462a795c5e29a39e887b85f762a0bb38566186c7a5544d6e2898972902f99bc35e322ef45379a17398f64a876d15cda5787d6b30a08c98420cc0134bb75293d81f4979fb75a48470b719b52bf8a4179fc34b28fefa402566ec685eda1230a6aa82937249d8239b3d31797e2815d17ff57b943911f09ee3934a9d0bd67d134a1b23d81c12e6d067b18057b88b9901f36871037589fca4149aabf29710769d5d20a8fe6fca1be2600ac42f40e24e56a2cbbf4dc1826678fc35fc872e04fbc955203c1c393e772993555a83207df3220d3e2c6e1cfb0ef7e55b178fa0c9fd85b01aeee511163de16ff374fa978775ab0af2f3b0f444b21b7b34d7bd23f1d5411fb2409b33f3746823847d62b956707fc6328a73deffe3f4d125199a551a3fd2de9cb4507d807568f001e847ac8f4d397c5867444a26a",
        "__v": 0
    };

    const locations = [{
        "_id": {
            "$oid": "636d7780ead809b722495f18"
        },
        "name": "Bingham",
        "lat": 41.5025,
        "long": -81.60694,
        "images": [
            "bingham_result.jpg"
        ],
        "type": [
            "Academic"
        ],
        "zone": "Quad"
    }, {
        "_id": {
            "$oid": "636efdfaa34294dcab072f84"
        },
        "name": "Glennan",
        "lat": 41.50157,
        "long": -81.60719,
        "images": [
            "glennan_result.jpg"
        ],
        "type": [
            "Academic"
        ],
        "zone": "Quad"
    }, {
        "_id": {
            "$oid": "636efe35a34294dcab072f85"
        },
        "name": "Kent Hale Smith",
        "lat": 41.503344,
        "long": -81.6065,
        "images": [
            "kenthalesmith_result.jpg"
        ],
        "type": [
            "Academic"
        ],
        "zone": "Quad"
    }]
    it('Should return false if should not add', () => {
        shouldAdd("White", user, locations).expect(false);
    })

    it('Should return true if should add', () => {
        shouldAdd('Kent Hale Smith', user, locations).expect(true);
    })
})