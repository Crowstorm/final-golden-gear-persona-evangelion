import { combineReducers } from 'redux';
import characterReducer from './reducers/characterReducer';
import mainCharacterPositionReducer from './reducers/mainCharacterPositionReducer';
import modalReducer from './reducers/modalReducer';
import levelReducer from './reducers/levelReducer';
import enemyReducer from './reducers/enemyReducer';
import combatReducer from './reducers/combatReducer';
import playerReducer from './reducers/playerReducer';
import eventReducer from './reducers/eventReducer';
import shopReducer from './reducers/shopReducer';

export default combineReducers({
    player: playerReducer,
    characters: characterReducer,
    position: mainCharacterPositionReducer,
    modal: modalReducer,
    level: levelReducer,
    enemy: enemyReducer,
    combat: combatReducer,
    event: eventReducer,
    shop: shopReducer
})