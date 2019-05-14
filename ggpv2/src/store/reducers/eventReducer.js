import produce from "immer";
import * as quests from '../quests/quests';


const eventDefaultState = {
    questLog: [

        // {
        //     name: "Trouble at the Crossroads",
        //     description: "I heard cries for help. Can't ignore a lady in distress",
        //     reward: null,

        //     enemiesDefeated: true,
        //     innVisited: false,
        //     drugged: true
        // }

    ],
    currentQuest: null,
    journal: [],
    combatTriggers: []
}

export default (state = eventDefaultState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'SET_CURRENT_QUEST':
                draft.currentQuest = quests[action.quest];
                break;
            case 'PUSH_TO_QUEST_LIST':
                draft.questLog.unshift(quests[action.quest]);
                break;
            case 'UPDATE_QUEST_PROGRESS':
                const { i, progressName, questName, value } = action;
                draft.questLog[i][progressName] = value;
                break;
            case 'UPDATE_COMBAT_TRIGGERS':
                draft.combatTriggers.push(action.combatTriggers);
                break;
            case 'REMOVE_COMBAT_TRIGGER':
                draft.combatTriggers.splice(action.i, 1);
                break;
            case 'CLEAR_COMBAT_TRIGGERS':
                draft.combatTriggers = [];
                break;
            default:
                return draft;
        }
    })
}