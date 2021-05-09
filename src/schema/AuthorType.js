const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const { books } = require("../data");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
    //  you cannot use require at top for this 
      type: new GraphQLList(require("./BookType")), 
      resolve(parent) {
        return books.filter(book => book.authorId== parent.id) 
      }, 
    },
  }),
});

module.exports = AuthorType;
