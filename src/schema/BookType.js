const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const AuthorType = require('./AuthorType')

const { authors } = require("../data")

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author : {
        type : AuthorType ,
        resolve(parent){
          return authors.find(author => author.id == parent.authorId )
        }
      }
    }),
  });   

module.exports = BookType