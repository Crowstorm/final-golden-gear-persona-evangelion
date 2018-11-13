import produce from "immer";

let initial_state = {
    currentLevel: 'ThroneRoom'
}

export default (state = initial_state, action) => {
   return produce(state, draft => {
        switch (action.type) {
            case 'CHANGE_LEVEL': {
                draft.currentLevel = action.levelName;
                // draft.y += 1;
                // draft.model = back;
                break;
                // return {
                //     ...state,
                //     y: state.y + 1,
                //     model: back
                // }
            }
            default: {
                return draft;
            }
        }
    });
}