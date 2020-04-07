const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, currentBlog) => {
        return acc + currentBlog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const mostLikes = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
    delete mostLikes.url
    delete mostLikes._id
    delete mostLikes.__v

    return mostLikes
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const blogsOrdered = _.chain(blogs)
        .countBy('author')
        .map((val, key) => {
            return { author: key, blogs: val }
        })
        .orderBy('blogs', 'desc')
        .head()
        .value()

    return blogsOrdered
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}

