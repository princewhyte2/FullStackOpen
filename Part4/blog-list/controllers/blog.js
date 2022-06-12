const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")
const userExtractor = require("../utils/middleware").userExtractor

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1, id: 1 })
    .populate("comments", { comment: 1, id: 1 })

  response.json(blogs)
})

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate("user", { username: 1, name: 1, id: 1 })
    .populate("comments", { comment: 1, id: 1 })

  response.json(blog)
})

blogRouter.post("/", userExtractor, async (request, response, next) => {
  const body = request.body

  const user = request.user

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await newBlog.save()
  user.blogs = [...user.blogs, savedBlog._id]

  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.post("/:id/comments", async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  console.log("body", request.body)
  const comment = new Comment({
    comment: body.comment,
    blog: blog._id,
  })

  const savedComment = await comment.save()
  blog.comments = [...blog.comments, savedComment._id]
  await blog.save()

  response.status(201).json(savedComment)
})

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  const isSameUser = blog.user.toString() === user._id.toString()
  if (isSameUser) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).json({ error: "not authorized to perform this operation" })
  }
})
// , userExtractor
blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  // const blogToUpdate = await Blog.findById(request.params.id)
  // const user = request.user
  // const isSameUser = blogToUpdate.user.toString() === user._id.toString()
  // if (isSameUser) {
  //   const blog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  //   response.json(blog)
  // } else {
  //   response.status(403).json({ error: "not authorized to perform this operation" })
  // }
  const blog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true }).populate("comments", {
    comment: 1,
    id: 1,
  })
  response.json(blog)
})

module.exports = blogRouter
