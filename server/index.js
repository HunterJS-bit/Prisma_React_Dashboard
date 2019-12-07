const express = require('express');
const dotenv = require('dotenv');
const { prisma } = require('./generated/prisma-client')
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    },
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT;

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);