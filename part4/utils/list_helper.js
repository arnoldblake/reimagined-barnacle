const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, b) => a.likes > b.likes ? a : b)
}

const mostBlogs = (blogs) => {
    const counts = _.countBy(blogs, (blog) => blog.author)
    const countsArray = _.map(counts, (blogs, author) => ({ author, blogs }))
    return _.maxBy(countsArray, 'blogs')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}