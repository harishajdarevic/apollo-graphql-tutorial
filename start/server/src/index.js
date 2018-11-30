const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');


const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/launch');

const store = createStore();

// resolver
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = (req.headers && req.headers.authorization) || '';
        const email = new Buffer(auth, 'Base64').toString('ascii');

        // if the email isn't formatted
        // if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const users = await store.users.findOrCreate({ where: { email } });
        const user = users && users[0] ? users[0] : null;

        return { user: { ...user.dataValues } };
    },
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});