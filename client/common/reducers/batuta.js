/**
 * Class Reducers
 * @class Reducers
 * @classdesc Represent the Reducers what control when the state need to change in weather
 * @extends Component
 * @author clenon <code@carloslenon.com>
 */

import * as Actions from './../actions';

const initialState = {
    list: []
}

const batuta = (state = initialState, action) => {

    switch (action.type) {
        case Actions.LIST_COUNTRIES:            
            return { type: action.type, list: action.promise };        
        default:
            return Object.assign({}, state, action);
    }
}


export default batuta;
