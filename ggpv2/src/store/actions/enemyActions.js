

const getEnemyHp = (i, getState) => {
    return getState().enemy[i].stats.hp;
}


export const enemyLoseHp = (hp, i) => {
    return function (dispatch, getState) {
        dispatch({
            type: 'ENEMY_LOSE_HP',
            hp,
            i
        })
        let remainingHp = getEnemyHp(i, getState);
        if (remainingHp <= 0) {
            killEnemy(i, dispatch);
            if(getState().enemy.length === 0){
                alert('wygrales')
            }
        }
    }
}

export const killEnemy = (i, dispatch) => {
        dispatch({
            type: 'KILL_ENEMY',
            i
        })
}

export const enemyTurn = (dispatch, getState) =>{
    console.log('indeed enemy');
}

export const nextAllyTurn = () => (dispatch, getState) =>{
    let currentIndex = getState().combat.attackerIndex;
    let numberOfAllies = getState().characters.length;
    //if all ally attacked - enemy turn
    if(currentIndex +1 === numberOfAllies){
        console.log('ENEMY')
        const whoseTurn = 'enemy';
        dispatch({
            type: 'CHANGE_TURN',
            whoseTurn
        })
        enemyTurn(dispatch, getState);
    } else {
        dispatch({
            type: 'INCREMENT_ATTACKER_INDEX'
        })
    }
}