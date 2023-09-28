import graphql, {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema,GraphQLList, buildSchema} from 'graphql'
import express, {Express, Request, Response} from 'express'
import {graphqlHTTP} from 'express-graphql'


const app: Express = express()


interface bookint {
    name: string,
    genre: string,
    id: string,
    authorId: string
}
interface authorint {
    name: string,
    age: number,
    id: string
}
const books: bookint[] = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1',authorId:"1"},
    { name: 'The Final Empire', genre: 'Fantasy', id: '2',authorId:"2" },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId:"3" },
    { name: 'The Hero of Ages', genre: 'Sci-Fi', id: '4', authorId:"2" },
    { name: 'The Colour of Magic', genre: 'Sci-Fi', id: '5', authorId:"3" },
    { name: 'The Light Fantastic', genre: 'Sci-Fi', id: '6', authorId:"3" },
];

const authors: authorint[] = [
    { name: 'Patfrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' },
];

const BookType:GraphQLObjectType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},        
        genre:{type: GraphQLString},
        author:{type: authorType,
            resolve(parent,args){
                var match:authorint={id:'',name:'',age:0};
                authors.forEach(element => {
                    if (element.id == parent.authorId){
                        match = element;
                    }
                }) 
                return match;
            }   
        }
    })
});

const authorType:GraphQLObjectType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                var booksByAuthor: bookint[] = [];
                books.forEach(element => {
                    if (element.authorId == parent.id){
                        booksByAuthor.push(element);
                    }
                }) 
                return booksByAuthor;
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
                var match:bookint={id:'',name:'',genre:'',authorId:'0'};
                books.forEach(element => {
                    if (element.id === args.id){
                        console.log(element);
                        match = element;
                    }
                }) 
                return match;
            }
        },
        author: {
            type: authorType,
            args:{id: {type: GraphQLString}},
            resolve(parent,args){
                var match:authorint={id:'',name:'',age:0};
                authors.forEach(element => {
                    if (element.id === args.id){
                        console.log(element);
                        match = element;
                    }
                }) 
                return match;
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors: {
            type: GraphQLList(authorType),
            resolve(parent,args){
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

const schema:GraphQLSchema = new GraphQLSchema({query:RootQuery})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
})
);

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")