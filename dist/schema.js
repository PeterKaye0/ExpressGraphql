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
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: "1" },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: "2" },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: "3" },
    { name: 'The Hero of Ages', genre: 'Sci-Fi', id: '4', authorId: "2" },
    { name: 'The Colour of Magic', genre: 'Sci-Fi', id: '5', authorId: "3" },
    { name: 'The Light Fantastic', genre: 'Sci-Fi', id: '6', authorId: "3" },
];
const authors = [
    { name: 'Patfrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
];
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString },
        author: { type: authorType,
            resolve(parent, args) {
                var match = { id: '', name: '', age: 0 };
                authors.forEach(element => {
                    if (element.id == parent.authorId) {
                        match = element;
                    }
                });
                return match;
            }
        }
    })
});
const authorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        books: {
            type: (0, graphql_1.GraphQLList)(BookType),
            resolve(parent, args) {
                var booksByAuthor = [];
                books.forEach(element => {
                    if (element.authorId == parent.id) {
                        booksByAuthor.push(element);
                    }
                });
                return booksByAuthor;
            }
        }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                var match = { id: '', name: '', genre: '', authorId: '0' };
                books.forEach(element => {
                    if (element.id === args.id) {
                        console.log(element);
                        match = element;
                    }
                });
                return match;
            }
        },
        author: {
            type: authorType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                var match = { id: '', name: '', age: 0 };
                authors.forEach(element => {
                    if (element.id === args.id) {
                        console.log(element);
                        match = element;
                    }
                });
                return match;
            }
        },
        books: {
            type: (0, graphql_1.GraphQLList)(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: (0, graphql_1.GraphQLList)(authorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});
/* const schema:GraphQLSchema = buildSchema(`
    type: Query{
        hello: String
    }
`) */
const schema = new graphql_1.GraphQLSchema({ query: RootQuery });
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema,
    graphiql: true
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
