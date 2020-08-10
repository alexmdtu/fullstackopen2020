const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
        let userObject = new User(user)
        await userObject.save()
    }
})

describe('invalid user with ', () => {
    test('non-unique username', async () => {
        const nonUniqueUser = {
            username: 'atu',
            name: 'Alex',
            password: 'secret'
        }

        await api
            .post('/api/users')
            .send(nonUniqueUser)
            .expect(400)
    })

    test('too short username', async () => {
        const shortUsernameUser = {
            username: 'a',
            name: 'Alex',
            password: 'secret'
        }

        await api
            .post('/api/users')
            .send(shortUsernameUser)
            .expect(400)
    })
    test('too short password', async () => {
        const shortPasswordUser = {
            username: 'atu',
            name: 'Alex',
            password: 's'
        }

        await api
            .post('/api/users')
            .send(shortPasswordUser)
            .expect(400)
    })

    test('without username', async () => {
        const nonExistingUsernameUser = {
            name: 'Alex',
            password: 'secret'
        }

        await api
            .post('/api/users')
            .send(nonExistingUsernameUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})