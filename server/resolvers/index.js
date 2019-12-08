// mock data
const users = [{ id: 1, email: 'marko123@gmail.com' }, { id: 2, email: 'marko22@gmail.com' }];
const user = { email: 'marko je carrrr ' };
const mushorooms = [
    {
        name: 'Black Poplar “Piopinno”',
        type: false,
        info: 'Black Poplar, or “Piopinno” in Italian, is a clustering, meaty mushroom with a nutty and crunchy flavor, it prefers '
    }];

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        users: () => users,
        mushorooms: () => mushorooms,
    },
    Mutation: {
        createUser: async (parent, args, ctx, info) => {
            await ctx.prisma.createUser({ email: args.email, password: '12313' });
        },
        deleteUser: async (ctx, args) => {
            await ctx.prisma.removeUser({ email: args.email });
        },
        loginUser: async (parent, args, ctx) => {
            let { email, password } = args;
            const foundUser = await ctx.prisma.user({ email: email });
            console.log(foundUser);
            if (!foundUser) {
                throw new Error('Invalid Login');
            }
            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatch) {
                throw new Error('Invalid Login');
            }

            const token = jwt.sign(
                {
                    id: foundUser.id,
                    username: foundUser.email,
                },
                process.env.secret,
                {
                    expiresIn: '30d', // token will expire in 30days
                },
            );

            ctx.res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 31,
            });

            return { ...foundUser, token };
        }
    }
};

module.exports = resolvers;