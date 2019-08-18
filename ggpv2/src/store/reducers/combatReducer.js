import produce from "immer";

const combatDefaultState = {
    isCombat: false,
    battleBackground: "http://www.sclance.com/backgrounds/rpg-battle-background/rpg-battle-background_1947994.png",
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
    enemiesInReserve: [],
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
            case 'LOAD_GAME':
                return action.combatState;
            case 'TOGGLE_COMBAT':
                draft.isCombat = !draft.isCombat;
                break;
            case 'RESET_COMBAT_REDUCER':
                return combatDefaultState;
            case 'INCREMENT_COMBAT_TURN':
                draft.combatTurn++;
                break;
            case 'ADD_ENEMY_TO_RESERVE':
                draft.enemiesInReserve.push(action.enemy);
                break;
            case 'REMOVE_ENEMY_FROM_RESERVE':
                draft.enemiesInReserve.shift();
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
                if (draft.info.length > 4) {
                    draft.info.pop();
                }
                break;
            case 'UPDATE_COMBAT_REWARDS':
                draft.reward.exp += action.exp;
                draft.reward.gold += action.gold;
                if (action.items) draft.reward.items.push(action.items);
                if (action.trigger) draft.reward.trigger.push(action.trigger);
                break;
            case 'SET_BATTLE_BACKGROUND':
                draft.battleBackground = action.background;
                break;
            default:
                return draft;
        }
    })
}

export default combatReducer;