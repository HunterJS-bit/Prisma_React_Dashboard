const express = require('express');
const dotenv = require('dotenv');
const { prisma } = require('./generated/prisma-client')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { jwtValidate } = require('./middleware');

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
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(jwtValidate);

server.applyMiddleware({ app, path: "/graphql", cors: false });

const PORT = process.env.PORT;

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);