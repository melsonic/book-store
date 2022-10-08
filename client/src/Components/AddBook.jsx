import React from 'react'
import {gql, useQuery} from '@apollo/client'
import Form from './Form'

const getAuthorQuery = gql`
  query{
    authors{
      name
      id
    }
  }
`

function AddBook(){

  const {loading, error, data} = useQuery(getAuthorQuery)

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error :( </h1>

  var authors = data.authors

  return(
    <div>
      <Form authors={authors}/>
    </div>
  )
}

export default AddBook