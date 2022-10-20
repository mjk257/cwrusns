const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    it('Should render index.ejs', () => {
        request(app)
            .get("/")
            .expect(200)
            .expect('Location', '/index')
    })
});

describe('GET /error', () => {
    it('Should render error.ejs', () => {
        request(app)
            .get("/error")
            .expect(200)
            .expect('Location', '/error')
    })
})

describe('GET /register', () => {
    it('Should render register.ejs', () => {
        request(app)
            .get("/register")
            .expect(200)
            .expect('Location', '/register')
    })
})

describe('GET /login', () => {
    it('Should render login.ejs', () => {
        request(app)
            .get("/login")
            .expect(200)
            .expect('Location', '/login')
    })
})

describe('GET /logout', () => {
    it('Should logout and redirect', () => {
        request(app)
            .get("/logout")
            .expect(302)
            .expect('Location', '/schedule')
    })
})

describe('POST /register', () => {
    it('Should redirect to home on success', () => {
        request(app)
            .post("/register")
            .send({
                username: 'test@test.com',
                password: 'password'
            })
            .expect(302)
            .expect('Location', '/')
    })

    it('Should redirect to register on failure', () => {
        request(app)
            .post("/register")
            .send({
                username: 'test@test.com',
                password: ''
            })
            .expect(302)
            .expect('Location', '/register')
    })
})

describe('POST /login', () => {
    it('Should redirect for incorrect login', () => {
        request(app)
            .post("/login")
            .send({
                username: 'wrong',
                password: 'wrong'
            })
            .expect(302)
            .expect('Location', '/login')
    })

    it('Should redirect to home and authenticate for good login', () => {
        request(app)
            .post("/login")
            .send({
                username: 'mjk257@case.edu',
                password: 'test'
            })
            .expect(302)
            .expect('Location', '/')
    })

})