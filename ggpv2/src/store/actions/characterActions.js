import _ from 'lodash';

import { changeTurn } from './combatActions';
import * as items from '../items/items';

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

export const charRestore = (statType, amount, i) => {
    console.log(statType, amount, i)
    return function (dispatch) {
        dispatch({
            type: 'ALLY_RESTORE',
            statType,
            i,
            amount
        })
    }
}


//removes inventory or abilities from characters
export const charAbilityItemRemover = (section, name, i) => {
    return function (dispatch, getState) {
        // znajdz w odpowiedniej sekcji
        switch(section){
            case 'consumables':
                let currentItems = getState().characters[0].consumables;
                console.log(currentItems);
                console.log(name)
                let indexToRemove = _.findIndex(currentItems, {name: name})
                dispatch({
                    type: 'REMOVE_ITEM_OR_ABILITY',
                    section,
                    index: indexToRemove
                })
            break;
            default:
            console.error('Couldnt find section')
        }
        // znajdz index
        //usunac po indeksie
    }
}