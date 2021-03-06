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
    const mostLikes = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }, {})
    delete mostLikes.url
    delete mostLikes._id
    delete mostLikes.__v

    return mostLikes
}

const mostBlogs = (blogs) => {
    const author = _.chain(blogs)
        .countBy('author')
        .map((val, name) => {
            return { author: name, blogs: val }
        })
        .orderBy('blogs', 'desc')
        .head()
        .value()

    return author ? author : {}
}

const mostLikes = (blogs) => {
    const author = _.chain(blogs)
        .maxBy('likes')
        .pick(['author', 'likes'])
        .value()

    return author
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

