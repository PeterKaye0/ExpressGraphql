var {graphql, buildSchema} = require("graphql")


//construct a schema, using graphql schema language
var schema = buildSchema(`
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

graphql({
    schema,
    source: "{ hello }",
    rootValue,
}).then(response => {
    console.log(response)
})