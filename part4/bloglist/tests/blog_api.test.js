const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)


let validToken = ''
let blogWithUser = {}

beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'atu', name: 'Alex', passwordHash })

    await user.save()

    blogWithUser = {
        title: 'Test',
        author: 'Alex',
        url: 'www.test.com',
        likes: 10,
        user: user
    }

    const response = await api
        .post('/api/login')
        .send({
            username: 'atu',
            password: 'secret'
        })

    validToken = response.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have default id property', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    ids.forEach(id => expect(id).toBeDefined())
})

test('a valid blog with correct token can be added ', async () => {
    const newBlog = {
        title: 'Adding a new blog',
        author: 'Alex',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2000,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        'Adding a new blog'
    )
})

test('a valid blog with invalid token gets rejected ', async () => {
    const newBlog = {
        title: 'Adding a new blog',
        author: 'Alex',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2000,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog without likes property still gets added', async () => {
    const newBlog = {
        title: 'A blog missing likes property',
        author: 'Alex',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        'A blog missing likes property'
    )

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(0)
})

test('note without content is not added', async () => {
    const newBlog = {
        author: 'Alex'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogToSave = new Blog(blogWithUser)
        await blogToSave.save()
        const blogsAtStart = await helper.blogsInDb()
        const blogsToDelete = blogsAtStart[blogsAtStart.length - 1]

        await api
            .delete(`/api/blogs/${blogsToDelete.id}`)
            .set('Authorization', `bearer ${validToken}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogsToDelete.title)
    })
})

describe('updating a blog post', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogsToDelete = blogsAtStart[0]

        const newBlog = {
            title: 'Updated blog title',
            author: 'New Author',
            url: 'www.newupdate.com',
            likes: 1234,
        }

        await api
            .put(`/api/blogs/${blogsToDelete.id}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'Updated blog title'
        )

        const authors = blogsAtEnd.map(n => n.author)
        expect(authors).toContain('New Author')

        const urls = blogsAtEnd.map(n => n.url)
        expect(urls).toContain('www.newupdate.com')

        const likes = blogsAtEnd.map(n => n.likes)
        expect(likes).toContain(1234)
    })
})

afterAll(() => {
    mongoose.connection.close()
})