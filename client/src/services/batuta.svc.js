/**
 * Class BatutaSVC
 * @class ApiUrl
 * @classdesc Represent the list of services what call to the batuta http apiRest
 * @author clenon <code@carloslenon.com>
 */
//core dependencies
import HTTP from 'axios';
//services
import Endpoints from './../common/endpoint';
import * as Actions from './../common/actions';

export const getAllCountries = () => {
    const url = Endpoints.countries.all;
    return (dispatch, getState) => {        
        HTTP({
            method: 'get',
            url: url,
        })
        .then((response) => {            
            dispatch({ type: Actions.REQUEST_DONE });               
            dispatch( { type: Actions.LIST_COUNTRIES, promise: response.data } )
        });
    }    
}

export const getAllCountriesByName = (_countryName) => {
    const url = Endpoints.countries.byName;
    return (dispatch, getState) => {        
        HTTP({
            method: 'post',
            url: url,
            data: {
                countryName: _countryName
            },            
        })
        .then((response) => {
            dispatch({ type: Actions.REQUEST_DONE });               
            dispatch( { type: Actions.LIST_COUNTRIES, promise: response.data } )
        });
    }    
}