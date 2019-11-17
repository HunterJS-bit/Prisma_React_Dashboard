// mock data
const users = [{ id: 1, email: 'marko123@gmail.com' }, { id: 2, email: 'marko22@gmail.com' }];
const user = users[0];
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
        createUser: () => user,
        deleteUser: () => user,
    }
};

module.exports = resolvers;