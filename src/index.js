const { ApolloServer, gql } = require("apollo-server");

// graphql schema
// nesting schemas

// Query run parallel while Mutation run sequentially
const typeDefs = gql`

    input userArgs {
    username: String!,
    password: String!
    }

  type Query{
    hello  : String!,
    profile(username : String!,age : Int!) : Profile!
  }

  type Profile {
      name : String!,
      age : Int!
  }

  type User {
    id: ID!
    name: String!
  }

  type Error {
    message: String
  }

  type RegisterResponse {
    errors: [Error]
    status: Int!
  }

  type Mutation {
    register: RegisterResponse!,
    login(creds : userArgs ) : Boolean!
  }
`;

// resolver
const resolvers = {
  Query: {
    hello: () => "hello graphql !!",
    profile : ()=>({
        name:"bittu",
        age:25
    })

  },
  Mutation: {
    register: () => ({
      errors: [{message: " Sorry error"}],
      status: 200 ,
    }),
    login : () => true 
  },
};

// server instance
const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`>Apollo server runnning at ${url}`));
