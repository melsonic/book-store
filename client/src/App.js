import './App.css';
import BookList from './Components/BookList';
import AddBook from './Components/AddBook';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// apollo client set up
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Melsonic BookList</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
