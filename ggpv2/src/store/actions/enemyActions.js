export const enemyLoseHp = (hp, i) =>{
    return function(dispatch){
        dispatch({
            type: 'ENEMY_LOSE_HP',
            hp,
            i
        })
    }
}