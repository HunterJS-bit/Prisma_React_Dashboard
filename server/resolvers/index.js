// mock data
const users = [{ id: 1, email: 'marko123@gmail.com' }, { id: 2, email: 'marko22@gmail.com' }];
const user = { email: 'marko je carrrr ' };
const mushorooms = [
    {
        name: 'Black Poplar “Piopinno”',
        type: false,
        info: 'Black Poplar, or “Piopinno” in Italian, is a clustering, meaty mushroom with a nutty and crunchy flavor, it prefers '
    }];

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
        loginUser: (ctx, args) => {
            const email = args.email;
            console.log('emailll');
        }
    }
};

module.exports = resolvers;