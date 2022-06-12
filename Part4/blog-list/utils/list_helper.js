const pick = require('lodash/pick');
var _ = require('lodash');
const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
    return 1;
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes;
    }, 0);
}


const favoriteBlog = (blogs) => {
    const max = blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max;
    }, { likes: 0 });
    return pick(max, ['title', 'author', 'likes']);
}


const mostBlogs = (blogs) => {
    const authors = _.max(_.map(blogs, 'author'));
    const authorCount = _.countBy(blogs, 'author')

    return {
        author: authors,
        blogs: authorCount[authors] || 0
    }
}



const mostLikes = (blogs) => {
    const authors = []
    const authorGroup = _.groupBy(blogs, 'author');
    _.forOwn(authorGroup, (value, key) => {
        authors.push({
            author: key,
            likes: _.sumBy(value, 'likes')
        })
    })
    const maxAuthor = _.maxBy(authors, 'likes');

    return maxAuthor;

}

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }
]


const listWithMultipleBlogs = [

    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}




module.exports = {
    usersInDb, blogsInDb, dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, listWithMultipleBlogs, initialBlogs
}