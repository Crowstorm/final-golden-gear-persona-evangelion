import produce from "immer";

import front from '../../assets/sprites/mainCharacter/overworld/mainCharFront.gif';
import back from '../../assets/sprites/mainCharacter/overworld/mainCharBack.gif';
import left from '../../assets/sprites/mainCharacter/overworld/mainCharLeft.gif';
import right from '../../assets/sprites/mainCharacter/overworld/mainCharRight.gif';
import combat from '../../assets/sprites/mainCharacter/overworld/combat.png';

let initial_state = {
    x: 3,
    y: 3,
    model: back
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'MOVE_CHAR_UP': {
                if (draft.y + 1 > 25) {
                    return;
                }
                draft.y += 1;
                draft.model = back;
                break;
            }
            case 'MOVE_CHAR_DOWN': {
                if (draft.y - 1 < 1) {
                    return;
                }
                draft.y -= 1;
                draft.model = front;
                break;
            }
            case 'MOVE_CHAR_RIGHT': {
                if (draft.x + 1 > 25) {
                    return;
                }
                draft.x += 1;
                draft.model = right;
                break;
            }
            case 'MOVE_CHAR_LEFT': {
                if (draft.x - 1 < 1) {
                    return;
                }
                draft.x -= 1;
                draft.model = left;
                break;
            }
            case 'PRE_BATTLE_ANIMATION_TOGGLE': {
                draft.model = combat;
                break;
            }
            case 'SET_CHARACTER_POSITION': {
                draft.x = action.x;
                draft.y = action.y
                break;
            }
            default: {
                return draft;
            }
        }
    });
}