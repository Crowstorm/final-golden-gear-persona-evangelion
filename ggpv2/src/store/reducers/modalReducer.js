import produce from "immer";


const initial_state = {
    //dialogue
    dialogueVisibility: false,
    characterCardVisibility: false
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
         switch (action.type) {
             case 'TOGGLE_DIALOGUE': {
                 draft.dialogueVisibility = !draft.dialogueVisibility
                 break;
             }
             case 'TOGGLE_CHARACTER_CARD': {
                 draft.characterCardVisibility = !draft.characterCardVisibility
                 break;
             }
             default: {
                 return draft;
             }
         }
     });
 }