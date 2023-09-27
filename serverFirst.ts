import express, { request, response } from 'express';

import  { graphql, buildSchema, GraphQLSchema } from 'graphql'

type Schema = GraphQLSchema;

//construct a schema, using graphql schema language
var schema:Schema = buildSchema(`
    type Query {
        hello: String
    }
`)

//the rootvalue provides a resolver function for each API endpoint
var rootValue = {
    hello: ()=> {
        return "hello world!"
    },
}

//run the grpahql query '{ hello }' abd print out the response
  
var hello = graphql({
    schema,
    source: "{ hello }",
    rootValue,
}).then(response => {
    console.log(response)
})

