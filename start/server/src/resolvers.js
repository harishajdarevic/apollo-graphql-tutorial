module.exports = {
    Query: {
        launches: async (_, __, { dataSources }) =>
            dataSources.launchAPI.getAllLaunches(),
        launch: async(_, { id }, { dataSources }, info) => {
            console.log(`
            parent: ${_},
            id: ${id},
            dataSources: ${dataSources},
            info: ${JSON.stringify(info)},

            `);
            return dataSources.launchAPI.getLaunchById({ launchId: id})
        },
        me: async(_, __, { dataSources } ) =>
            dataSources.userAPI.findOrCreateUser()
    }
}