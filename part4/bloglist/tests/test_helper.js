const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'Alex',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Another Blog',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
    {
        username: 'atu',
        name: 'Alex',
        password: 'secret'
    }
]

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, initialUsers
}