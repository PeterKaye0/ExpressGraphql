"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
//construct a schema, using graphql schema language
var schema = (0, graphql_1.buildSchema)(`
    type Query {
        hello: String
    }
`);
//the rootvalue provides a resolver function for each API endpoint
var rootValue = {
    hello: () => {
        return "hello world!";
    },
};
//run the grpahql query '{ hello }' abd print out the response
var hello = (0, graphql_1.graphql)({
    schema,
    source: "{ hello }",
    rootValue,
}).then(response => {
    console.log(response);
});
