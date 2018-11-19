const enemyDefaultState = {
    basicAllyHitChance: 70, 
    basicCriticalMultiplier: 1.5,
    whoseTurn: "ally",
    attackerIndex: 0,
    attackReady: false
}

const combatReducer = (state = enemyDefaultState, action) => {
    switch (action.type) {
        case 'IS_ATTACK_READY':
            return{
                ...state,
                attackReady: action.isReady
            }

        default:
            return state;
    }

}

export default combatReducer;