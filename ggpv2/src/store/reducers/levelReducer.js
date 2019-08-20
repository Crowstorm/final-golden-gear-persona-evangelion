import produce from "immer";

let initial_state = {
    currentLevel: 'ThroneRoom',
    movementSpeed: 20
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'LOAD_GAME':
                return action.levelState;
            case 'CHANGE_LEVEL': {
                draft.currentLevel = action.levelName;
                break;
            }
            default: {
                return draft;
            }
        }
    });
}