import produce from "immer";
import * as quests from '../quests/quests';


const eventDefaultState = {
    questLog: [

    ],
    currentQuest: null,
    journal: []
}

export default (state = eventDefaultState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            // case 'BOOST_STAT':
            //     draft[action.i].stats[action.stat] += action.val;
            //     break;
            // case 'REMOVE_ITEM_OR_ABILITY':
            //     let array = state[0][action.section]
            //     draft[0][action.section].splice(action.index, 1);
            //     break;
            case 'SET_CURRENT_QUEST':
                draft.currentQuest = quests[action.quest];
                break;
            case 'PUSH_TO_QUEST_LIST':
                draft.questLog.unshift(quests[action.quest]);
                break;
            default:
                return draft;
        }
    })
}