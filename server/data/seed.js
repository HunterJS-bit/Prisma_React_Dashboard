const { prisma } = require('../generated/prisma-client');
const users = require('./users.json');
const posts = require('./posts.json');
const bcrypt = require('bcryptjs');
/*
const db = new Prisma({
    endpoint: 'http://localhost:4466'
});
*/
// setup seed 
const setup = async () => {

    const Users = users.map(async (user, index) => {
        const userPassword = await bcrypt.hash(user.password, 10);
        return await prisma.createUser({ email: user.email, name: user.name, role: user.role, password: userPassword });
    });
    const userList = await Promise.all(Users);

    const postCreator = userList[0];

    const Posts = posts.map(async (post, index) => {
        return await prisma.createPost({
            author: {
                connect: { id: postCreator.id }
            }, title: post.title, excerpt: post.excerpt
        });
    });

    const postList = await Promise.all(Posts);

};

setup();