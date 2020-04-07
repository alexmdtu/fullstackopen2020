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
        .toPairs()
        .head()
        .value()

    return { author: blogsOrdered[0], blogs: blogsOrdered[1] }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}

