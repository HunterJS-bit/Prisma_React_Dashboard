const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const cloudinaryUpload = require('../utils/cloudinaryUtil');


// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        getUsers: async (parent, args, ctx, info) => {
            return await ctx.prisma.users({});
        },
        getConstributors: async (parent, args, ctx, info) => {
            console.log('GET USERSSS');

            return await ctx.prisma.users({
                where: { OR: [{ role: 'CONSTRIBUTOR' }, { role: 'ADMIN' }] },
            });
        },
        mushorooms: () => {
            console.log('Get other POSTS');
        },
        getPosts: async (parent, args, ctx, info) => {

        }
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
                    expiresIn: '15min', // token will expire in 15min
                },
            );
            // token will expire in 7days
            const refreshToken = jwt.sign({ id: foundUser.id }, process.env.refreshToken, { expiresIn: '7d' });

            ctx.res.cookie('x-access', accesToken, {
                httpOnly: true,
            });

            ctx.res.cookie('x-refresh', refreshToken, {
                httpOnly: true,
            });

            return { ...foundUser };
        },
        refreshToken: async (parent, args, ctx, info) => {

        },
        createPost: async (parent, args, ctx, info) => {
            console.log('Im herere in resolver');
            const { title, author, content, image } = args.input;
            if (image) {
                cloudinaryUpload(image, ctx.prisma);
            }
            const data = await ctx.prisma.createPost({
                author: {
                    connect: { id: author }
                },
                title,
                content,

            });
        }
    }
};

module.exports = resolvers;