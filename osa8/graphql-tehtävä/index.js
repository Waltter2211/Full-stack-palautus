const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const mongoUrl = process.env.MONGODB_URI

console.log(mongoUrl)

mongoose.connect(mongoUrl)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err.message))

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]
        ): Book

        addAuthor(
          name: String!
          born: Int
        ): Author
        
        editAuthor(
            name: String!
            setBornTo: Int
        ): Author

        createUser(
          username: String!
          favoriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (args.author) {
            return await Book.find({ author: args.author }).populate('author')
        }
        else if (args.genres) {
            return await Book.find({ genres: args.genres }).populate('author')
        }
        else {
            return await Book.find({}).populate('author')
        }
    },
    /* allAuthors: () => authors.map(({name, born}) => {
        const bookCount = books.filter((b) => b.author === name).length
        return {
            name,
            born,
            bookCount
        }
    }) */
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
        /* if (books.find(b => b.title === args.title)) {
            throw new GraphQLError('Title must be unique', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.title
                }
            })
        }
        const book = { ...args, id: uuid() }
        books = books.concat(book)
        const namesArr = authors.map((a) => a.name)
        if (!namesArr.includes(args.author)) {
            const person = { id: uuid(), name: args.author, born: null, bookCount: 1 }
            authors = authors.concat(person)
            return book
        }
        else {
            return book
        } */
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      const book = new Book({ title: args.title, published: args.published, author: args.author, genres: [...args.genres] })
      return book.save()
        .catch(err => {
          throw new GraphQLError('Creating new book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              err
            }
          })
        })
    },
    addAuthor: (root, args) => {
      const author = new Author({ ...args })
      return author.save()
      .catch(err => {
        throw new GraphQLError('Creating new author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            err
          }
        })
      })
    },
    editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }
        let person = await Author.findOne({ name: args.name })
        try {
          person.born = args.setBornTo
          person.save()
        } catch (error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              err
            }
          })
        }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.name,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})