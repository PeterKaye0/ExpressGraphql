import { GraphQLSchema, buildSchema } from "graphql"

import express, {Express, Request, Response} from 'express'

import {graphqlHTTP} from 'express-graphql'


type Schema = GraphQLSchema;

var schema:Schema = buildSchema(`
    type Query {
        hello: String
    }
`)

var root:object = {
    hello: () => {
        return "hello world!"
    },
}

var app:Express = express()

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root, 
        graphiql: true,
    })
)

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")