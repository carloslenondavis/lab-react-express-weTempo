import RP from 'request-promise';
import Routes from '../../common/routes';

const weatherApiKey = Routes.base.weatherApiKey;
const commonRPOpt = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },    
    json: true,
};

export const weatherByCityName = (_cityName) => {
    const url = Routes.city.weatherByName + _cityName + '&' + weatherApiKey;    
    return RP({
        ...commonRPOpt,
        uri: url,
    });
}