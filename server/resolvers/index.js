const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getAnalytics } = require('../services/google-util');
const cloudinaryUpload = require('../utils/cloudinaryUtil');
const GraphQLJSON = require('graphql-type-json');


// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        analytics: async (parent, args, ctx, info) => {
            console.log('Fetching analytics');
            const data = await getAnalytics();
            console.log(data);
            return data;
        },
        posts(parent, args, ctx, info) {
            return ctx.prisma.posts();
        },
        users: async (parent, args, ctx, info) => {
            return await ctx.prisma.users();
        },
        user: async (parent, args, ctx, info) => {
            const id = args.id;
            return await ctx.prisma.user({ id: id });
        },  
        getConstributors: async (parent, args, ctx, info) => {
            // GET CONSTRIBUTORS
            return await ctx.prisma.users({
                where: { OR: [{ role: 'CONSTRIBUTOR' }, { role: 'ADMIN' }] },
            });
        },
        mushorooms: () => {
            console.log('Get other POSTS');

        },
        getPosts: async (parent, { limit, skip }, ctx, info) => {
            const allPosts = await ctx.prisma.posts();
            const total = allPosts.length;
            const posts = allPosts.slice(skip * limit, (limit * skip) + limit);
            return {
                posts,
                total,
            };

        },
        blog: async (parent, { limit, skip }, ctx, info) => {
            const posts = await ctx.prisma.posts({
                where: {
                    isPublished: true
                }
            });
            // const total = allPosts.length;
            // const posts = allPosts.slice(skip * limit, (limit * skip) + limit);

            return posts;
        },
        getPost: async (parent, args, ctx, info) => {
            if (args.id) {
                const id = args.id;
                const post = await ctx.prisma.post({ id });

                return post;
            }
        },
        getUsers: async (parent, { limit, skip }, ctx, info) => {
            const allUsers = await ctx.prisma.users();
            const total = allUsers.length;
            const users = allUsers.slice(skip * limit, (limit * skip) + limit);
            return {
                users,
                total,
            };

        },
    },
    Mutation: {
        registerUser: async (parent, args, ctx, info) => {
            const { password } = args.input;
            const hassPass = await bcrypt.hash(password, parseInt(process.env.salt, 10));

            await ctx.prisma.createUser({ ... args.input, password: hassPass });
        },
        createUser: async (parent, args, ctx, info) => {
            await ctx.prisma.createUser({ email: args.email, password: '12313' });
        },
        editUser: async (parent, args, ctx, info) => {
            console.log('Edit userrrrr ');
        },
        updateUserPassword: async (parent, args, ctx, info) => {
            console.log('Update user password');
        },
        deleteUser: async (parent, args, ctx, info) => {
            const id = args.id;;
            return await ctx.prisma.deleteUser({ id });
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
            const { title, author, content, image, excerpt, isPublished } = args.input;

            if (image) {
                cloudinaryUpload(image, ctx.prisma);
            }

            const data = await ctx.prisma.createPost({
                author: {
                    connect: { id: author }
                },
                title,
                content,
                excerpt,
                isPublished
            });

        },
        removePost: async (parent, args, ctx, info) => {
            const id = args.id;
            await ctx.prisma.deletePost({ id });
            return 'ok';
        },
        updatePost: async (parent, args, ctx, info) => {
            const id = args.id;
            const data = args.input;
            // todo move it to frontend, filter object and only post changed fields
            Object.keys(data).forEach((key) => (data[key]) ? data.key : delete data[key]);
            if (data.author) {
                data.author = { connect: { id: data.author } };
            }

            await ctx.prisma.updatePost({
                data,
                where: {
                    id,
                }
            })


        },
        postComment: async (parent, args, ctx, info) => {
            console.log('Posting comment');
            const { comment, author } = args.input;
            console.log(comment, author);
            console.log(ctx.prisma.comment);

        }
    },
    JSON: GraphQLJSON,
    User: {
        posts(parent, args, ctx, info) {
            return ctx.prisma.user({ id: parent.id }).posts()
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return ctx.prisma.post({ id: parent.id }).author()
        },
    },
};

module.exports = resolvers;