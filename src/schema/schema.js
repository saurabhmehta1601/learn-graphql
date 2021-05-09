const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

const dummyBook = {
  id:"1",
  name: "Your dummy book",
  genre : "No genra "
}


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        // resolver function for query Book"
        return dummyBook
      },
    },
  },
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
