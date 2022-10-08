const express = require('express')
const expressGraphQl = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

// allow cross-origin request
const cors = require('cors')
app.use(cors())

mongoose.connect('mongodb+srv://dbUser:dbUserPassword@gql-melsonic.komoce1.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', expressGraphQl.graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log("server listening on port 4000")
})