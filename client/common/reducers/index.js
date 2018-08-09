/**
 * Class Reducers
 * @class Reducers
 * @classdesc Represent the Reducers what control when the state need to change
 * @extends Component
 * @author clenon <code@carloslenon.com>
 */

//core dependencies
import { combineReducers } from 'redux';
import request from '../reducers/request';
import batuta from '../reducers/batuta';
import weather from '../reducers/weather';

const app = combineReducers({
    request,
    batuta,
    weather
});

export default app;