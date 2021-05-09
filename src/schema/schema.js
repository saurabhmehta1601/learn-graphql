const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
} = require("graphql");
 
const AuthorType = require("./AuthorType")
const BookType = require("./BookType")

const { books,authors } = require("../data") 

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: { 
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, {id}) {
        // resolver function for query Book"
        return books.find( book => book.id==id );
      },
    },
    author : {
      type : AuthorType,
      args : { 
        id: {type : GraphQLID},
    },
      resolve(parent,{id}){
        return authors.find( author => author.id==id )
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
