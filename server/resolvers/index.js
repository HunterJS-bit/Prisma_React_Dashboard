const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
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

            const accesToken = jwt.sign(
                {
                    id: foundUser.id,
                    username: foundUser.email,
                },
                process.env.accesToken,
                {
                    expiresIn: '15min', // token will expire in 1day
                },
            );
            const refreshToken = jwt.sign({ id: foundUser.id }, process.env.refreshToken, { expiresIn: '7d' });

            ctx.res.cookie('x-access', accesToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 31,
            });

            ctx.res.cookie('x-refresh', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 31,
            });

            return { ...foundUser, token: accesToken };
        }
    }
};

module.exports = resolvers;