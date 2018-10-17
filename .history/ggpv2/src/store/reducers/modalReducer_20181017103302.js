import produce from "immer";


const initial_state = {
    //dialogue
    dialogueVisibility: false,
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
         switch (action.type) {
             case 'TOGGLE_DIALOGUE': {
                 draft.dialogueVisibility = !draft.dialogueVisibility
                 break;
             }
             default: {
                 return draft;
             }
         }
     });
 }