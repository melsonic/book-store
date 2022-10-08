import {gql} from '@apollo/client'

const getBooksQuery = gql`
  query{
    books{
      id
      name 
      genre
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

export {getBooksQuery,addBookMutation}