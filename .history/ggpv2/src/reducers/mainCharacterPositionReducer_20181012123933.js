import produce from "immer";

import front from '../assets/sprites/mainCharFront.gif';
import back from '../assets/sprites/mainCharBack.gif';
import left from '../assets/sprites/mainCharLeft.gif';
import right from '../assets/sprites/mainCharRight.gif';

let initial_state = {
    x: 12,
    y: 2,
    model: back
}

export default (state = initial_state, action) => {
     produce(state, draft => {
        switch (action.type) {
            case 'MOVE_CHAR_UP': 
                draft.y += 1;
                draft.model = back;
                // return {
                //     ...state,
                //     y: state.y + 1,
                //     model: back
                // }
            
            case 'MOVE_CHAR_DOWN': {
                return {
                    ...state,
                    y: state.y - 1,
                    model: front
                }
            }
            case 'MOVE_CHAR_RIGHT': {
                return {
                    ...state,
                    x: state.x + 1,
                    model: right
                }
            }
            case 'MOVE_CHAR_LEFT': {
                return {
                    ...state,
                    x: state.x - 1,
                    model: left
                }
            }
            case 'SET_CHARACTER_POSITION': {
                return {
                    ...state,
                    x: action.x,
                    y: action.y
                }
            }
            default: {
                return state;
            }
        }
    });
}