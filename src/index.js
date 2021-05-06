// To be continued
const {ApolloServer,gql,PubSub} = require("apollo-server")

// Graphql schemas
const typeDefs = gql`
    type Query {
    name:String
} 

    type Mutation {
    register : RegisterResponse
   }

    type Subscription {
    newUser : User!
   }

    type RegisterResponse {
        status : String! ,
        user(name:String!,password:String!)  : User 
    }

    type User   {
        name:String!,
        password:String!
   }
`
// Key for subscription type
const NEW_USER = "NEW_USER"

// subscriptions are to add real time functionality to api
// resolver functions can be async too like normal functions 
// Inside Subscribe instead of passing fields with value as functions we pass value as object with function named subscribe
const resolvers = {
    Subscription :  {
        newUser : {
            subscribe : (_,__,{pubsub}) => {
                return  pubsub.asyncIterator(NEW_USER)
            }
        }
    },
    User : (parent,{name,password}) =>{
        return {name , password}
    },
    Mutation : {
        register : () =>{
            pubsub.publish(NEW_USER)
            return {
                status: " registered  ", 
                user : (_,{name,password}) =>  {
                    name,
                    password
                }
            }
        }
    }
    }   
    
const pubsub =  new PubSub()

const server = new ApolloServer( {typeDefs,resolvers,context : ({req,res})=>{ return {req,res,pubsub}} } )
server.listen().then(({url}) =>console.log(`>Running Apollo server at ${url}`))
