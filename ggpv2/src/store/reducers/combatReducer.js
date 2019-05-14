import produce from "immer";

const combatDefaultState = {
    isCombat: false,
    basicAllyHitChance: 100,
    basicCriticalMultiplier: 1.5,
    combatTurn: 0,
    whoseTurn: "ally",
    attackerIndex: 0,
    attackReady: false,
    helpReady: false,
    activeAbility: {
        type: null,
        name: null
    },
    activeItem: {
        name: null
    },
    info: [],
    reward: {
        exp: 0,
        gold: 0,
        items: [],
        trigger: []
    }
}

const combatReducer = (state = combatDefaultState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'TOGGLE_COMBAT':
                draft.isCombat = !draft.isCombat;
                break;
            case 'RESET_COMBAT_REDUCER':
                return combatDefaultState;
            case 'INCREMENT_COMBAT_TURN':
                draft.combatTurn++;
                break;
            case 'IS_ATTACK_READY':
                draft.attackReady = action.isReady
                break;
            case 'IS_HELP_READY':
                draft.helpReady = action.isReady
                break;
            case 'SET_ACTIVE_ABILITY':
                draft.activeAbility.type = action.abilityType;
                draft.activeAbility.name = action.name;
                break;
            case 'RESET_ACTIVE_ABILITY':
                draft.activeAbility.type = null;
                draft.activeAbility.name = null;
                break;
            case 'SET_ACTIVE_ITEM':
                draft.activeItem.name = action.name;
                break;
            case 'RESET_ACTIVE_ITEM':
                draft.activeItem.name = null;
                break;
            case 'CHANGE_TURN':
                draft.whoseTurn = action.whoseTurn;
                break;
            case 'INCREMENT_ATTACKER_INDEX':
                draft.attackerIndex += 1;
                break;
            case 'SET_ATTACKER_INDEX':
                draft.attackerIndex = action.i;
                break;
            case 'RESET_ATTACKER_INDEX':
                draft.attackerIndex = 0;
                break;
            case 'ADD_INFO_TO_ARRAY':
                draft.info.unshift(action.info);
                break;
            case 'UPDATE_COMBAT_REWARDS':
                draft.reward.exp += action.exp;
                draft.reward.gold += action.gold;
                if (action.items) draft.reward.items.push(action.items);
                if (action.trigger) draft.reward.trigger.push(action.trigger);
                break;
            default:
                return draft;
        }
    })
    // switch (action.type) {
    //     case 'TOGGLE_COMBAT':
    //         return {
    //             ...state,
    //             isCombat: !state.isCombat
    //         }
    //     case 'IS_ATTACK_READY':
    //         return {
    //             ...state,
    //             attackReady: action.isReady
    //         }
    //     case 'IS_HELP_READY':
    //         return {
    //             ...state,
    //             helpReady: action.isReady
    //         }
    //     case 'SET_ACTIVE_ABILITY':
    //         return {
    //             ...state,
    //             activeAbility: {
    //                 ...state.activeAbility,
    //                 type: action.abilityType,
    //                 name: action.name
    //             }
    //         }
    //     case 'RESET_ACTIVE_ABILITY': {
    //         return {
    //             ...state,
    //             activeAbility: {
    //                 ...state.activeAbility,
    //                 type: null,
    //                 name: null
    //             }
    //         }
    //     }
    //     case 'SET_ACTIVE_ITEM':
    //         return {
    //             ...state,
    //             activeItem: {
    //                 ...state.activeItem,
    //                 name: action.name
    //             }
    //         }
    //     case 'RESET_ACTIVE_ITEM': {
    //         return {
    //             ...state,
    //             activeItem: {
    //                 ...state.activeItem,
    //                 name: null
    //             }
    //         }
    //     }
    //     case 'CHANGE_TURN':
    //         return {
    //             ...state,
    //             whoseTurn: action.whoseTurn
    //         }
    //     case 'INCREMENT_ATTACKER_INDEX':
    //         return {
    //             ...state,
    //             attackerIndex: state.attackerIndex + 1
    //         }
    //     case 'SET_ATTACKER_INDEX':
    //         return {
    //             ...state,
    //             attackerIndex: action.i
    //         }
    //     case 'RESET_ATTACKER_INDEX':
    //         return {
    //             ...state,
    //             attackerIndex: 0
    //         }
    //     case 'ADD_INFO_TO_ARRAY': {
    //         return {
    //             ...state,
    //             info: [action.info, ...state.info]
    //         }
    //     }
    //     case 'UPDATE_QUEST_REWARDS': {

    //     }

    //     default:
    //         return state;
    // }

}

export default combatReducer;