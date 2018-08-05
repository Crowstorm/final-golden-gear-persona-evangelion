import { createStore,  applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers from './reducers'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    let store = createStore(reducers,
        composeEnhancers(
            applyMiddleware(thunk, ReduxPromise)
        )
    )
    return store;
}
