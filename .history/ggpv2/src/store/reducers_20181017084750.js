import { combineReducers } from 'redux';
import characterReducer from './reducers/characterReducer';
import mainCharacterPositionReducer from './reducers/mainCharacterPositionReducer';


export default combineReducers({
    characters: characterReducer,
    position: mainCharacterPositionReducer
})