import { changeTurn } from './combatActions';

export const checkIfCharactersAlive = () => {
    return function (dispatch, getState) {
        const chars = getState().characters;
        let counter = 0;
        let areAlive = true;
        chars.forEach(char => {
            if (char.stats.hp <= 0) {
                counter++;
            }
        })

        if (counter >= 4) {
            areAlive = false;
        }

        return areAlive;
    }
}

export const allyLoseHp = (dmg, i) => (dispatch, getState) => {
    const currentHp = getState().characters[i].stats.hp;
    if (dmg > currentHp) {
        dmg = currentHp
    }
    dispatch({
        type: 'ALLY_LOSE_HP',
        dmg,
        i
    })
    let areAlive = dispatch(checkIfCharactersAlive());
    if (!areAlive) {
        dispatch({
            type: 'TOGGLE_COMBAT'
        })
    }
}

export const allyLoseMana = (val, i) => (dispatch, getState) => {
    const currentMana = getState().characters[i].stats.mp;
    if (val > currentMana) {
        val = currentMana
    }
    dispatch({
        type: 'ALLY_LOSE_MP',
        val,
        i
    })
}

//Boosts ally statistics
export const boostStat = (stat, val, i) => {
    return function (dispatch) {
        dispatch({
            type: 'BOOST_STAT',
            stat,
            val,
            i
        })
    }
}