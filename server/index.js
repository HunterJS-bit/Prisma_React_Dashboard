const express = require('express');
const dotenv = require('dotenv').config();
const { prisma } = require('./generated/prisma-client')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { jwtValidate } = require('./middleware');
const { oauth2Client } = require('./services/google-util');


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
app.get('/google/return',async (req, res) => {
	const code = req.query.code;
	console.log(':// GET ACCESS TOKEN ');
	try {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);
	} catch(err) {
		console.log('Error: ' + err)
	}
	res.redirect('http://localhost:2000/dashboard')
})

const PORT = process.env.PORT;

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);