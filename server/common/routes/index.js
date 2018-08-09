/**
 * Class ApiUrl
 * @class ApiUrl
 * @classdesc Represent the list of end point fake call
 * @author clenon <code@carloslenon.com>
 */

import Config from '../utilities/config';

const apiUrl = {
    base: {
        weatherApiKey: 'appid=' + Config.weatherCommId,
        batutaApiKey: 'key=' + Config.battutaCommId,
    },
    countries: {
        all: Config.baseBattutaApiServerHost + '/country/all/',
        byName: Config.baseBattutaApiServerHost + '/country/search/?country=',
    },
    city: {
        weatherByName: Config.baseWeatherApiServerHost + '?q='        
    }
}

export default apiUrl;