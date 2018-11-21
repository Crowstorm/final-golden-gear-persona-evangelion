const enemyDefaultState = {
    basicAllyHitChance: 100,
    basicCriticalMultiplier: 1.5,
    whoseTurn: "ally",
    attackerIndex: 3,
    attackReady: false
}

const combatReducer = (state = enemyDefaultState, action) => {
    switch (action.type) {
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

        default:
            return state;
    }

}

export default combatReducer;