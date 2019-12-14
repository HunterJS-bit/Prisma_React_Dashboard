const { prisma } = require('../generated/prisma-client');
const users = require('./users.json');
const bcrypt = require('bcryptjs');
/*
const db = new Prisma({
    endpoint: 'http://localhost:4466'
});
*/
// setup seed 
const setup = async () => {

    const allUsers = users.map(async (user, index) => {
        const userPassword = await bcrypt.hash(user.password, 10);
        await prisma.createUser({ email: user.email, name: user.name, role: user.role, password: userPassword });
    });
    await Promise.all(allUsers);

    // await prisma.createUser({ email: 'markoo', password: 'milos' })
    console.log('Doneeee');
};

setup();