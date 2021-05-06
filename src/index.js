const {ApolloServer,gql} = require("apollo-server")

// graphql schema
const typeDefs = gql`
    type Query {
        hello:String!
    }
`

// resolver
const resolvers = {
    Query:{
        hello : () => "hello World !!"
    }
}

// server instance 
const server = new ApolloServer({typeDefs,resolvers})

server.listen().then(({url})=> console.log(`>Apollo server runnning at ${url}`))
