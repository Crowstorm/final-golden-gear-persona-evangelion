import produce from "immer";

let initial_state = {
    currentLevel: 'CapitalCrossroads',
    movementSpeed: 20
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
        switch (action.type) {
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