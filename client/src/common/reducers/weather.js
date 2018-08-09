/**
 * Class Reducers
 * @class Reducers
 * @classdesc Represent the Reducers what control when the state need to change in weather
 * @extends Component
 * @author clenon <code@carloslenon.com>
 */

import * as Actions from './../actions';

const initialState = {
    weather: {}
}

const weather = (state = initialState, action) => {

    switch (action.type) {
        case Actions.CITY_WEATHER:            
            return { type: action.type, weather: action.promise };
        default:
            return Object.assign({}, state, action);
    }
}


export default weather;
