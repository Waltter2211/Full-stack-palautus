const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
      allAuthors: async (root, args) => {
        return await Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }

        const book = new Book({ title: args.title, published: args.published, author: args.author, genres: [...args.genres] })

        try {
            await book.save()
        } catch (error) {
            throw new GraphQLError('Creating new book failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.title,
                  error
                }
              })
        }
        pubsub.publish('BOOK_ADDED', { addBook: book })
  
        return book
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
    },
    Subscription: {
        addBook: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers