const { ApolloServer, gql , UserInputError,AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb://localhost:27017/library'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`

  type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String,genre: String): [Book!]!
    allAuthors : [Author!]!
    me: User
    recommendedBooks: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name:String!
      setBornTo: Int!
    ): Author

    createUser(
    username: String!
    favouriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token

  }
`




const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount:async () => Author.collection.countDocuments(),
    allBooks: async (root, arg) => {
      const { author, genre } = arg
      if (author && genre) 
        return Book.find({
          author: author, genres: { 
            $in: [genre]
        } })
      if (author) 
        return Book.find({ 'author.name': author }).populate('author')
      if (genre)
        return Book.find({ genres: { $in: [genre] } }).populate('author')
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, { currentUser }) => {
      return currentUser
    },
    recommendedBooks: async (root, args, { currentUser }) => {
      
       if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
      const { favouriteGenre } = currentUser
      const books = await Book.find({ genres: { $in: [favouriteGenre] } }).populate('author')
      return books
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      
       if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
      const {author} = args
      const book = new Book({ ...args })
      try {
        const bookAuthor = await Author.findOne({ name: author })
        if (!bookAuthor) {
          const newAuthor = new Author({ name: author })
          await newAuthor.save()
          book.author = newAuthor
        } else {
          book.author = bookAuthor
        }
        await book.save()
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      } 
      return book
    },
    editAuthor: async (root, args,{currentUser}) => {

       if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }
      const { name, setBornTo } = args
      const author = await Author.findOne({ name: name })
      author.born = setBornTo
      try {
        
        await author.save()
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ 'author.name': root.name })
      return books.length
    }
  }
}

const JWT_SECRET = 'aslkdfjoiq12312'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})