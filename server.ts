import { GraphQLSchema, buildSchema } from "graphql"
import express, {Express, Request, Response} from 'express'
import {graphqlHTTP} from 'express-graphql'

const query:GraphQLSchema = require('./schema')

type Schema = GraphQLSchema;

const schema:Schema = buildSchema(`
    type Query {
        hello: String
    }
`)

const root:object = {
    hello: () => {
        return "hello world!"
    },
}

const app:Express = express()

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
console.log(query);

