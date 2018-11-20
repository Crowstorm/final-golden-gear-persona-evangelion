import {changeTurn} from './combatActions';

export const nextAllyTurn = () => (dispatch, getState) =>{
    let currentIndex = getState().combat.attackerIndex;
    let numberOfAllies = getState().characters.length;
    if(currentIndex +1 === numberOfAllies){
        console.log('xD')
        //enemy turn
        const whoseTurn = 'enemy';
        dispatch({
            type: 'CHANGE_TURN',
            whoseTurn
        })
    } else {
        dispatch({
            type: 'INCREMENT_ATTACKER_INDEX'
        })
    }
}