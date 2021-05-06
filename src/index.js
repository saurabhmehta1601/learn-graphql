const { ApolloServer, gql } = require("apollo-server");

// graphql schema
// nesting schemas

const typeDefs = gql`

  type Query{
    hello  : String!
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
    register: RegisterResponse!
  }
`;

// resolver
const resolvers = {
  Query: {
    hello: () => "hello graphql !!",
  },
  Mutation: {
    register: () => ({
      errors: null,
      status: 200 ,
    }),
  },
};

// server instance
const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`>Apollo server runnning at ${url}`));
