"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const app = (0, express_1.default)();
const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString },
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                var match = { id: '', name: '', genre: '' };
                books.forEach(element => {
                    if (element.id === args.id) {
                        console.log(element);
                        match = element;
                    }
                });
                //if (!match){match= books[1];} 
                return match;
            }
        }
    }
});
const schema = new graphql_1.GraphQLSchema({ query: RootQuery });
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema,
    graphiql: true
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
console.log();
