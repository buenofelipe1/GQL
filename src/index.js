

const {ApolloServer, gql } = require('apollo-server');

// toda request é post
//toda request bate no mesmo ENDPOINT (/graphql)
// query -> obter informações (get)
//mutation -> manipular dados (post/put/patch/delete)
// scaler type -> int, booleam, float e ID




const typeDefs = gql `
type User {
     _id: ID!
    name: String!
    email:String!
    active: Boolean!
}

type Post{
_id: ID
name: String!
title: String
author: User!
}

type Query{
    hello:String
    users: [User!]!
    getUserByEmail(email: String!): User!
}
type Mutation {
  createUser(name: String!, email: String!): User!
}

`;

const users = [
    {_id: String(Math.random()), name: 'Felipe', email:'Felipe@teste', active:true},
    {_id: String(Math.random()), name: 'Felipe1', email:'Felipe1@teste', active:true},
    {_id: String(Math.random()), name: 'Felipe2', email:'Felipe2@teste', active:true},
            ];

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => users,
        getUserByEmail: (_, args) =>{
           return users.find((user) => user.email === args.email);
        },
    },
    Mutation:{
        createUser: (_,args) =>{
            const newUser ={
_id: String(Math.random()),
name: args.name,
email: args.email,
active: true,
            };
            
users.push(newUser);
return newUser;

        }
    },
    
};

const server = new ApolloServer ({ typeDefs, resolvers});

server.listen().then (({ url }) => console.log (`Server started at ${url}`));
