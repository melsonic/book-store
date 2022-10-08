import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'

export default function BookList(props){
  const {loading, error, data} = useQuery(getBooksQuery)
  // console.log(useQuery(getBooksQuery))
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error :( </h1>

  // console.log(data)
  let books = data.books

  return(
    <div>
      <ul id='book-list'>
        {books.map(b => {
          return <li key={b.id}>{b.name}</li>
        })}
      </ul>
    </div>
  )
}