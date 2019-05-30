import produce from "immer";
import * as quests from '../quests/quests';


const eventDefaultState = {
    questLog: [

        // {
        //     name: "Trouble at the Crossroads",
        //     description: "I heard cries for help. Can't ignore a lady in distress",
        //     reward: null,
        //     finished: false,
        //     enemiesDefeated: true,
        //     innVisited: false,
        //     drugged: true
        // },
        // {
        //     name: "New Allies",
        //     description: "Something bad has happened to me, I can't save the princess on my own anymore. I need to find people willing to help",
        //     reward: null,
        //     log: [],
        //     started: true,
        //     searchStart: true,
        //     gameCut: true,
        //     abandonedBuildingCleared: false,
        //     finished: false
        // }
        {
            name: "The Bridge",
            description: "We found Setsuna's companions. But it's gonna take some serious work to get to them in time.",
            reward: null,
            log: [],
            started: true,
            finished: false,
            firstWave: true,
            secondWave: false,
            battleWon: false
        }

    ],
    currentQuest: null,
    journal: [],
    combatTriggers: [],
    //{name of the level, uppercase}_{numberOfChest}
    chestsCleared: [],
    preCombatAnimation: false,
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
            case 'CHEST_CLEARED':
                draft.chestsCleared.push(action.name);
                break;
            case 'PRE_BATTLE_ANIMATION_TOGGLE':
                draft.preCombatAnimation = !draft.preCombatAnimation;
                break;
            default:
                return draft;
        }
    })
}