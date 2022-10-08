const graphql = require('graphql')
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID, 
  GraphQLInt, 
  GraphQLList,
  GraphQLNonNull
} = graphql
const Book = require('../models/book')
const Author = require('../models/author')

// dumy data
var books = [
  { name: "Name of the Wind", id: '1', genre: 'Fantacy', authorId: '1'    },
  { name: "The Final Empire", id: '2', genre: 'Fantacy', authorId: '2'    },
  { name: "The Long Earth", id: '3', genre: "Sci-fi", authorId: '3'       },
  { name: "The Hero of Ages", id: '4', genre: 'Fantacy', authorId: '2'    },
  { name: "The Colour of Magic", id: '5', genre: 'Fantacy', authorId: '3' },
  { name: "The Light Fantastic", id: '6', genre: 'Fantacy', authorId: '3' }
]

// author data
var authors = [
  {name: 'Patrick rothfuss', age:44, id: '1'},
  {name: 'Brandom Sanderson', age: 42, id: '2'},
  {name: 'Terry pratchett', age:66, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        // return authors.find(a => a.id == parent.authorId)
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return books.filter(b => b.authorId == parent.id)
        return Book.find({
          authorId: parent.id
        })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return books.find(e => e.id == args.id)
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {type: GraphQLID},
      },
      resolve(parent, args){
        // return authors.find(e => e.id == args.id)
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // return books
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        // return authors
        return Author.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return await book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})