const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        launches: async (_, {pageSize = 20, after}, {dataSources}) => {

            const allLaunches = await dataSources.launchAPI.getAllLaunches();

            // we want these in reverse chronological order
            allLaunches.reverse();

            const launches = paginateResults({
                after,
                pageSize,
                results: allLaunches,
            });

            const result = {
                launches,
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                // if the cursor of the end of the paginated results is the same as the
                // last item in _all_ results, then there are no more results after this
                hasMore: launches.length
                    ? launches[launches.length - 1].cursor !==
                    allLaunches[allLaunches.length - 1].cursor
                    : false,
            };

            return result;
        },
        launch: async (_, {id}, {dataSources}, info) => {
            return dataSources.launchAPI.getLaunchById({launchId: id})
        },
        me: async (_, __, {dataSources}) =>
            dataSources.userAPI.findOrCreateUser()
    },
    Mission: {
        missionPatch: (mission, {size} = {size: 'LARGE'}) => {
            console.log("missionPatch size: ", size);
            return size === 'SMALL'
                ? mission.missionPatchSmall
                : mission.missionPatchLarge
        }

    },
    Launch: {

        isBooked: async (launch, _, { dataSources }) => {
            console.log("launch in resolvers.js: ", launch);
            return dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
        }
    },
    User: {
        trips: async (_, __, { dataSources }) => {
            const launchsIds = await dataSources.userAPI.getLaunchIdsByUser();

            if(!launchsIds.length)
                return [];

            return dataSources.launchAPI.getLaunchesByIds({ launchsIds }) || [];
        }
    }
};
