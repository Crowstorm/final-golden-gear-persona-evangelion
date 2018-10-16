import produce from "immer";

import front from '../assets/sprites/mainCharacter/overworld/mainCharFront.gif';
import back from '../assets/sprites/mainCharacter/overworld/mainCharBack.gif';
import left from '../assets/sprites/mainCharacter/overworld/mainCharLeft.gif';
import right from '../assets/sprites/mainCharacter/overworld/mainCharRight.gif';

let initial_state = {
    x: 12,
    y: 2,
    model: back
}

export default (state = initial_state, action) => {
   return produce(state, draft => {
        switch (action.type) {
            case 'MOVE_CHAR_UP': {
                draft.y += 1;
                draft.model = back;
                break;
                // return {
                //     ...state,
                //     y: state.y + 1,
                //     model: back
                // }
            }
            case 'MOVE_CHAR_DOWN': {
                draft.y -= 1;
                draft.model = front;
                break;
                // return {
                //     ...state,
                //     y: state.y - 1,
                //     model: front
                // }
            }
            case 'MOVE_CHAR_RIGHT': {
                draft.x += 1;
                draft.model = right;
                break;
                // return {
                //     ...state,
                //     x: state.x + 1,
                //     model: right
                // }
            }
            case 'MOVE_CHAR_LEFT': {
                draft.x -= 1;
                draft.model = left;
                break;
                // return {
                //     ...state,
                //     x: state.x - 1,
                //     model: left
                // }
            }
            // case 'SET_CHARACTER_POSITION': {
            //     return {
            //         ...state,
            //         x: action.x,
            //         y: action.y
            //     }
            // }
            default: {
                return draft;
            }
        }
    });
}