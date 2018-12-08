const enemyDefaultState = {
    isCombat: true,
    basicAllyHitChance: 100,
    basicCriticalMultiplier: 1.5,
    whoseTurn: "ally",
    attackerIndex: 3,
    attackReady: false,
    info: []
}

const combatReducer = (state = enemyDefaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_COMBAT':
        return{
            ...state,
            isCombat: !state.isCombat
        }
        case 'IS_ATTACK_READY':
            return {
                ...state,
                attackReady: action.isReady
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