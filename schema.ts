import graphql, {GraphQLObjectType, GraphQLString, GraphQLSchema,buildSchema} from 'graphql'
import express, {Express, Request, Response} from 'express'
import {graphqlHTTP} from 'express-graphql'


const app: Express = express()


interface bookint {
    name: string,
    genre: string,
    id: string
}
const books: bookint[] = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},        
        genre:{type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
                var match:bookint={id:'',name:'',genre:''};
                books.forEach(element => {
                    if (element.id === args.id){
                        console.log(element);
                        match = element;
                    }
                }) 
                return match;
            }
        }
    }
});

const schema:GraphQLSchema = new GraphQLSchema({query:RootQuery})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
})
);

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")