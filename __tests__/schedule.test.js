const request = require('supertest');
const app = require('../app');

function authorize() {
    request(app)
        .post('/auth/local')
        .send({
            email: 'mjk257@case.edu',
            password: 'test'
        })
        .end(function (err, res) {
            if (err) {
                return done(err);
            }
            return res.body.token;
        });
}

describe('GET /schedule not logged in', () => {
    it('Should redirect', () => {
        request(app)
            .get("/schedule")
            .expect(302)
            .expect('Location', '/login')
    })
})

describe('GET /schedule logged in', () => {
    it('Should render schedule.ejs', () => {
        token = authorize()
        request(app)
            .get("/schedule")
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

})

describe('POST /schedule', () => {
    it('Should redirect to schedule if successful', () => {
        request(app)
            .post("/schedule")
            .send({
                name: "CSDS 393",
                startTime: "10:00",
                endTime: "11:15",
                location: "White",
                days: [2, 4]
            })
            .expect(302)
            .expect('Location', '/schedule')
    })
    it('Should redirect to error if successful', () => {
        request(app)
            .post("/schedule")
            .send({
                name: "",
                startTime: "10:00",
                endTime: "11:15",
                location: "White",
                days: [2, 4]
            })
            .expect(302)
            .expect('Location', '/error')
    })
})

describe('DELETE /schedule/:id', () => {
    it('Should redirect to schedule if successful', () => {
        request(app)
            .delete("/schedule/:id")
            .send({
                _id: "testID"
            })
            .expect(302)
            .expect('Location', '/schedule')
    })

    it('Should redirect to error if unsuccessful', () => {
        request(app)
            .delete("/schedule/:id")
            .send({
                _id: ""
            })
            .expect(302)
            .expect('Location', '/error')
    })
})