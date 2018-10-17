import produce from "immer";


const initial_state = {
    dialogueVisibility: false,
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
         switch (action.type) {
             case 'MOVE_CHAR_UP': {
                 draft.y += 1;
                 draft.model = back;
                 break;
             }
             default: {
                 return draft;
             }
         }
     });
 }