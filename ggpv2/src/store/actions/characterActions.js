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
        switch (section) {
            case 'consumables':
                let currentItems = getState().characters[0].consumables;
                console.log(currentItems);
                console.log(name)
                let indexToRemove = _.findIndex(currentItems, { name: name })
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

export const addToInventory = (item) => dispatch => {
    dispatch({
        type: 'ADD_TO_INVENTORY',
        item
    })
}

export const removeFromInventory = (item) => dispatch => {
    dispatch({
        type: 'REMOVE_FROM_INVENTORY',
        item
    })
}

export const equip = (charIndex, item) => (dispatch, getState) => {
    //check for the type of item to equip
    let slot = item.slot;
    //equip on proper slot

    //currentItem
    let currentItem = getState().characters[charIndex].armor[slot];
    dispatch(addToInventory(currentItem));

    dispatch({
        type: 'EQUIP',
        slot,
        item,
        index: charIndex
    })

    dispatch(removeFromInventory(item))
}

export const addExpPoints = (amount) => (dispatch, getState) => {
    let characters = getState().characters;

    if (amount) {
        characters.forEach((char, i) => {
            dispatch({
                type: 'ADD_EXP_POINTS',
                i,
                exp: amount
            })
        })
    } else {
        let exp = getState().combat.reward.exp;

        characters.forEach((char, i) => {
            dispatch({
                type: 'ADD_EXP_POINTS',
                i,
                exp
            })
        })
    }
}

export const alterGoldAmount = (amount) => (dispatch, getState) => {
    if (amount) {
        dispatch({
            type: 'ALTER_GOLD_AMOUNT',
            gold: amount
        })
    } else {
        let gold = getState().combat.reward.gold;
        dispatch({
            type: 'ALTER_GOLD_AMOUNT',
            gold
        })
    }
}

export const levelUp = (i, boost) => (dispatch, getState) => {
    let stats = getState().characters[i].stats;
    console.log({ stats });
    let newStats = { ...stats };
    newStats.level += 1;
    newStats.strength += boost;
    newStats.defence += boost;
    newStats.magic += boost;
    newStats.magicResist += boost;
    newStats.agility += boost;
    newStats.luck += boost - 1;
    newStats.speed += boost;

    newStats.maxHp += 3;
    newStats.hp += 3;
    newStats.maxMp += 3;
    newStats.mp += 3;

    dispatch({
        type: 'LEVEL_UP',
        i,
        newStats
    })
}

export const grantCombatRewards = () => async (dispatch, getState) => {
    dispatch(addExpPoints());
    dispatch(alterGoldAmount())
    let characters = getState().characters;
    let expTable = getState().player.expTable;

    while (characters[0].stats.exp >= expTable[0].exp) {
        characters.forEach((char, i) => {
            dispatch(levelUp(i, expTable[0].boost));
        })
        dispatch({
            type: 'SHIFT_EXP_TABLE'
        })
        expTable = getState().player.expTable;
    }
}

export const applyBuff = (newBuffs, i, isNew = true) => (dispatch) => {
    //sprawdzic czy juz nie byl jakis nalozony wczesniej o tej samej nazwie
    dispatch({
        type: 'APPLY_BUFF',
        newBuffs,
        i
    })

    if (isNew) {
        newBuffs.forEach(buff => {
            let stat = buff.stat;
            let val = buff.amount;
            dispatch({
                type: 'BOOST_STAT',
                val,
                stat,
                i
            })
        })
    }
}

export const removeBuff = (buff, buffIndex, charIndex) => (dispatch) => {
    let stat = buff.stat;
    let val = -buff.amount;
    dispatch({
        type: 'BOOST_STAT',
        val,
        stat,
        i: charIndex
    })

    dispatch({
        type: 'REMOVE_BUFF',
        charIndex,
        buffIndex
    })
}

export const changeBuffsCounter = () => (dispatch, getState) => {
    let characters = getState().characters;
    characters.forEach((char, i) => {
        if (char.buffs && char.buffs.length > 0) {
            let buffs = char.buffs;
            let newBuffs = [];
            buffs.forEach((buff, buffIndex) => {
                let newBuff = { ...buff };
                newBuff.duration--;

                //iff buff duration over, remove the buff from character
                if (newBuff.duration <= 0) {
                    dispatch(removeBuff(newBuff, buffIndex, i));
                } else {
                    newBuffs.push(newBuff)
                }
            })
            dispatch(applyBuff(newBuffs, i, false))
        }
    })
}

// export const checkIfAllyBuffOver = () => (dispatch, getState) => {
//     let characters = getState().characters;
//     characters.forEach((char, i) => {
//         if (char.buffs && char.buffs.length > 0) {

//         }
//     })
// }