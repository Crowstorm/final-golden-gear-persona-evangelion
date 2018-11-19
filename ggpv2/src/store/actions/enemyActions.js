const getEnemyHp = (i, getState) => {
    console.log(getState().enemy[i].stats.hp)
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
        }
    }
}

export const killEnemy = (i, dispatch) => {
        dispatch({
            type: 'KILL_ENEMY',
            i
        })
}