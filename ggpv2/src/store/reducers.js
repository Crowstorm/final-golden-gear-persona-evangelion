import { combineReducers } from 'redux';
import characterReducer from './reducers/characterReducer';
import mainCharacterPositionReducer from './reducers/mainCharacterPositionReducer';
import modalReducer from './reducers/modalReducer';
import levelReducer from './reducers/levelReducer';
import enemyReducer from './reducers/enemyReducer';

export default combineReducers({
    characters: characterReducer,
    position: mainCharacterPositionReducer,
    modal: modalReducer,
    level: levelReducer,
    enemy: enemyReducer
})