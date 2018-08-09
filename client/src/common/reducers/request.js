/**
 * Class Reducers
 * @class Request
 * @classdesc Represent the Request Reducer what control when the state need to change in todo
 * @extends Component
 * @author clenon <code@carloslenon.com>
 */
//core dependencies
import * as Actions from './../actions';

const request = (state = { isRequest: false }, action) => {

    switch (action.type) {        
        case Actions.REQUEST_START:
            return { isRequest : true };
        case Actions.REQUEST_DONE:
            return { isRequest : false };
        case Actions.REQUEST_ERR:
            return { type: action.type, err: action.promise };
        default:
            return Object.assign({}, state, action);
    }
}

export default request;