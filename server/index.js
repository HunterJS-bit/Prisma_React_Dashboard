const express = require('express');
const dotenv = require('dotenv');
const { prisma } = require('./generated/prisma-client')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

dotenv.config();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req) => ({
        ...req,
        prisma,
    }),
});


const app = express();

const corsOptions = {
    origin: "http://localhost:2000",
    credentials: true
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    console.log('Signed Cookies: ', req.signedCookies)
    next();
})

server.applyMiddleware({ app, path: "/graphql", cors: false });

const PORT = process.env.PORT;

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);