const express  =require("express")
const { graphql } = require("graphql")
const app = express()
const schema  = require("./schema/schema")



app.listen(4000,()=> console.log('> Express server running on port 4000'))
