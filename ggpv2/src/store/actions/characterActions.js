import {changeTurn} from './combatActions';



export const allyLoseHp = (dmg, i) => (dispatch) =>{
    dispatch({
        type: 'ALLY_LOSE_HP',
        dmg, 
        i
    })
}