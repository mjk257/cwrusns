const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')



describe('GET /', () => {
    it('Should render index.ejs', async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toEqual(200)
    })
});

describe('GET /error', () => {
    it('Should render error.ejs', async () => {
        const res = await request(app).get("/error")
        expect(res.statusCode).toEqual(200)
    })
})

describe('GET /register', () => {
    it('Should render register.ejs', async () => {
        const res = await request(app).get("/register")
        expect(res.statusCode).toEqual(200)
    })
})

describe('GET /login', () => {
    it('Should render login.ejs', async () => {
        const res = await request(app).get("/login")
        expect(res.statusCode).toEqual(200)
    })
})

describe('GET /logout', () => {
    it('Should logout and redirect', async () => {
        const res = await request(app).get("/logout")
        expect(res.statusCode).toEqual(302);
    })
})

describe('POST /register', () => {

})

describe('POST /login', () => {

})