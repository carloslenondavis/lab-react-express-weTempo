/**
 * Class Stores
 * @class Stores
 * @classdesc Represent the stores for all the app
 * @extends Component
 * @author clenon <code@carloslenon.com>
 */

//core dependencies
import { createStore, applyMiddleware } from 'redux';
import app from './../reducers';
import thunk from 'redux-thunk';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(app);

store.subscribe(() => {
    //console.log("next state", store.getState());
})

export default store;