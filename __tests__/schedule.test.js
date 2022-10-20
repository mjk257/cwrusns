const request = require('supertest');
const agentRequest = require('superagent');
const app = require('../app');
const testUser = agentRequest.agent();

describe('GET /schedule not logged in', () => {
    it('Should redirect', async () => {
        const res = await request(app).get("/schedule")
        expect(res.statusCode).toEqual(302)
    })
})

describe('GET /schedule logged in', () => {
    it('Should render schedule.ejs', async () => {
        const res = await testUser.get("/schedule")
        expect(res.statusCode).toEqual(200)
    })
})

describe('POST /schedule', () => {

})

describe('DELETE /schedule/:id', () => {

})