import { combineReducers } from 'redux';
import characterReducer from './reducers/characterReducer';
import mainCharacterPositionReducer from './reducers/mainCharacterPositionReducer';
import modalReducer from './reducers/modalReducer';


export default combineReducers({
    characters: characterReducer,
    position: mainCharacterPositionReducer,
    modal: modalReducer
})