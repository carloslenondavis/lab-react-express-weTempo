import RP from 'request-promise';
import Routes from '../../common/routes';

const batutaApiKey = Routes.base.batutaApiKey;
const commonRPOpt = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },    
    json: true,
};

export const allCountries = () => {
    const url = Routes.countries.all + '?' + batutaApiKey;    
    return RP({
        ...commonRPOpt,
        uri: url,
    });
}

export const countriesByName = (_name) => {
    const url = Routes.countries.byName + _name  + '&' + batutaApiKey;
    return RP({
        ...commonRPOpt,
        uri: url,
    });
}