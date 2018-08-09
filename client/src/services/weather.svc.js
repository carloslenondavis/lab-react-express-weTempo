/**
 * Class WeatherSVC
 * @class ApiUrl
 * @classdesc Represent the list of services what call to the waiter http apiRest
 * @author clenon <code@carloslenon.com>
 */
//core dependencies
import HTTP from 'axios';
//services
import Endpoints from './../common/endpoint';
import * as Actions from '../common/actions';

export const getWeatherByCityName = (_cityName) => {
    const url = Endpoints.city.byName;
    return (dispatch, getState) => {
        HTTP({
            method: 'post',
            url: url,
            data: {
                cityName: _cityName
            }
        })
        .then((response) => {
            dispatch({ type: Actions.REQUEST_DONE });
            dispatch({ type: Actions.CITY_WEATHER, promise: response.data })
        })
        .catch((err)=> {
            dispatch({ type: Actions.REQUEST_DONE });
            dispatch({ type: Actions.REQUEST_ERR, promise: err })
        })
    }
}