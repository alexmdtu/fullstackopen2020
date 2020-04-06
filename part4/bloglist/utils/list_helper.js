const dummy = (blogs) => {
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

module.exports = {
    dummy, totalLikes, favoriteBlog
}

