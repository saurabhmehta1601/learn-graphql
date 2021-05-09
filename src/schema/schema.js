const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = require("graphql");


const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, {id,name,genre}) {
        // resolver function for query Book"
        return { id,name,genre };
      },
    },
    author : {
      type : AuthorType,
      args : { 
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        age: {type : GraphQLInt},
    },
      resolve(parent,{id,name,age}){
        return { id,name,age }
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
