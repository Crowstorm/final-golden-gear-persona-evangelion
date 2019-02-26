const enemyDefaultState = {
    isCombat: false,
    basicAllyHitChance: 100,
    basicCriticalMultiplier: 1.5,
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
    info: []
}

const combatReducer = (state = enemyDefaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_COMBAT':
            return {
                ...state,
                isCombat: !state.isCombat
            }
        case 'IS_ATTACK_READY':
            return {
                ...state,
                attackReady: action.isReady
            }
        case 'IS_HELP_READY':
            return {
                ...state,
                helpReady: action.isReady
            }
        case 'SET_ACTIVE_ABILITY':
            return {
                ...state,
                activeAbility: {
                    ...state.activeAbility,
                    type: action.abilityType,
                    name: action.name
                }
            }
        case 'RESET_ACTIVE_ABILITY': {
            return {
                ...state,
                activeAbility: {
                    ...state.activeAbility,
                    type: null,
                    name: null
                }
            }
        }
        case 'SET_ACTIVE_ITEM':
            return {
                ...state,
                activeItem: {
                    ...state.activeItem,
                    name: action.name
                }
            }
        case 'RESET_ACTIVE_ITEM': {
            return {
                ...state,
                activeItem: {
                    ...state.activeItem,
                    name: null
                }
            }
        }
        case 'CHANGE_TURN':
            return {
                ...state,
                whoseTurn: action.whoseTurn
            }
        case 'INCREMENT_ATTACKER_INDEX':
            return {
                ...state,
                attackerIndex: state.attackerIndex + 1
            }
        case 'SET_ATTACKER_INDEX':
            return {
                ...state,
                attackerIndex: action.i
            }
        case 'RESET_ATTACKER_INDEX':
            return {
                ...state,
                attackerIndex: 0
            }
        case 'ADD_INFO_TO_ARRAY': {
            return {
                ...state,
                info: [action.info, ...state.info]
            }
        }

        default:
            return state;
    }

}

export default combatReducer;