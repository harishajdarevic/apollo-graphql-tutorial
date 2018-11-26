const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }

    async getAllLaunches() {
        const response = await this.get('launches');
        return response && response.length ? response.map(launch => this.launchReducer(launch)) : [];
    }

    // https://www.apollographql.com/docs/tutorial/data-source.html
    launchReducer(launch) {
        return {
            id: launch.flight_number,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name:
            }
        }
    }
    // async getLaunchById()


}

module.exports = LaunchAPI;