const request = require('supertest');
const User = require('../models/user');
const passport = require('passport');
const sinon = require('sinon');

// sinon.stub(passport, 'authenticate').returns(function (req, res, next) {
//     res.redirect('/');
// });


const app = require('../app');

describe('GET /', () => {
    it('Should render index.ejs', () => {
        return request(app)
            .get("/")
            .expect(200)
    })
});

describe('GET /error', () => {
    it('Should render error.ejs', () => {
        return request(app)
            .get("/error")
            .expect(200)
    })
})

describe('GET /register', () => {
    it('Should render register.ejs', () => {
        return request(app)
            .get("/register")
            .expect(200)
    })
})

describe('GET /login', () => {
    it('Should render login.ejs', () => {
        return request(app)
            .get("/login")
            .expect(200)
    })
})

describe('GET /logout', () => {
    it('Should logout and redirect', () => {
        return request(app)
            .get("/logout")
            .expect(302)
            .expect('Location', '/')
    })
})

describe('POST /register', () => {
    it('Should redirect to home on success', () => {
        return request(app)
            .post("/register")
            .send({
                username: 'test@test.com',
                password: 'password',
                passwordC: 'password'
            })
    })

    it('Should redirect to register on failure', () => {
        return request(app)
            .post("/register")
            .send({
                username: 'test@test.com',
                password: 'password',
                passwordC: 'not password'
            })
            .expect(302)
            .expect('Location', '/register')
    })
})

describe('POST /login', () => {
    it('Should redirect for incorrect login', () => {
        return request(app)
            .post("/login")
            .send({
                username: '',
                password: 'wrong'
            })
            .expect(302)
            .expect('Location', '/login')
    })

    it('Should redirect to home and authenticate for good login', () => {
        return request(app)
            .post("/login")
            .send({
                username: 'test@test.edu',
                password: 'test'
            })
    })

})