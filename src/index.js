const { ApolloServer, gql } = require("apollo-server");

// graphql schema
// nesting schemas

// Query run parallel while Mutation run sequentially
// Define in schema what arguments it takes
const typeDefs = gql`

# Custom user input for reusibility
  input creds {
    username: String!
    password: String!
  }

  type User {
    name: String!
    pass: String!
  }

  type Query {
    hello(name: String): String!
  }

  type Mutation {
    login(creds : creds): User!
  }
`;

// resolver
const resolvers = {
  Query: {
    hello: (parent, args) => {
      console.log(args);
      return `hello ${args.name}`;
    },
  },
  Mutation: {
    //   using arguments given to login
    login: (parent,{creds}) => {
       return   {
         name : creds.username,
         pass:creds.password
        }
    },
  } 
  
};

// server instance
const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log(`>Apollo server runnning at ${url}`));
