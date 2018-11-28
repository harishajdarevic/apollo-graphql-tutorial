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
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});