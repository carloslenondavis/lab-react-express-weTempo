/**
 * Class ApiUrl
 * @class ApiUrl
 * @classdesc Represent the list of end point fake call
 * @author clenon <code@carloslenon.com>
 */

import Config from './../utilities/config';

const apiUrl = {    
    countries: {
        all: Config.api.host + Config.api.zone + '/countries/all',
        byName: Config.api.host + Config.api.zone + '/countries/all/name',
    },
    city: {
        byName: Config.api.host + Config.api.zone + '/weather/city/name',
    }
}

export default apiUrl;