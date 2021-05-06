const {ApolloServer,gql} = require("apollo-server")

// Graphql schemas
const typeDefs = gql`
    
    type Query {
        hello( name: String! ): String!,
        parent : String,
        context : String,
        info:String
    }

    
`

// resolver function take arguments as (parent,args,context,info)
const resolvers = {
    Query : {
        // Example on how to use args in resolver arguments 
        hello : (parent,{name}) => ` Hello ${name} `,

        // arguments in resolver
        parent: (parent) => console.dir("parent object is ",parent) , 
        context : (parent,args,context) =>{
            // console.log("context object ",context);
            // console.log("request object ",context.req);
            console.log("response object  ",context.res);
        },
        info : (parent,args,context,info) =>{
            console.log("info object  ",info);
        }
    }
}   


const server = new ApolloServer( {typeDefs,resolvers,context : ({req,res})=>{ return {req,res}} } )
server.listen().then(({url}) =>console.log(`>Running Apollo server at ${url}`))
