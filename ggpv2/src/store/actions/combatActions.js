import { changeBuffsCounter } from './characterActions';
import { getAliveCharacter, enemyTurn } from './enemyActions';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const toggleCombat = () => async (dispatch, getState) => {
    const isCombat = getState().combat.isCombat;
    const enemies = getState().enemy;
    const enemiesInReserve = getState().combat.enemiesInReserve;
    enemies.forEach((enemy) => {
        if (enemy.loot) {
            dispatch(updateCombatRewards(enemy.loot.exp, enemy.loot.gold, enemy.loot.items))
        }
    })
    enemiesInReserve.forEach((enemy) => {
        if (enemy.loot) {
            dispatch(updateCombatRewards(enemy.loot.exp, enemy.loot.gold, enemy.loot.items))
        }
    })

    //delay for animation
    // if (!getState().combat.isCombat) {
    //     dispatch({
    //         type: 'PRE_BATTLE_ANIMATION_TOGGLE'
    //     })
    //     await timeout(2000);
    //     dispatch({
    //         type: 'PRE_BATTLE_ANIMATION_TOGGLE'
    //     })
    // }

    dispatch({
        type: 'TOGGLE_COMBAT'
    })


    if (isCombat) {
        dispatch(usePostcombatTriggers());
        dispatch({
            type: 'CLEAR_COMBAT_TRIGGERS'
        })
        dispatch(resetCombatReducer());
    }
}

//Triggers functions stored in reducer at the end of combat (for example qquest update)
export const usePostcombatTriggers = () => (dispatch, getState) => {
    const triggers = getState().combat.reward.trigger;
    triggers.map(trigger => {
        trigger.effect();
    })
}

export const resetCombatReducer = () => dispatch => {
    dispatch({
        type: 'RESET_COMBAT_REDUCER'
    })
}

export const updateCombatRewards = (exp, gold, items, trigger) => dispatch => {
    if (!exp) exp = 0;
    if (!gold) gold = 0;
    dispatch({
        type: 'UPDATE_COMBAT_REWARDS',
        exp, gold, items, trigger
    })
}

export const isAttackReady = (isReady) => {
    return function (dispatch, getState) {
        if (getState().combat.helpReady) {
            dispatch(isHelpReady(false));
        }

        dispatch({
            type: 'IS_ATTACK_READY',
            isReady
        })
    }
};
export const isHelpReady = (isReady) => {
    return function (dispatch, getState) {
        if (getState().combat.attackReady) {
            dispatch(isAttackReady(false));
        }

        dispatch({
            type: 'IS_HELP_READY',
            isReady
        })
    }
};


export const nextAllyTurn = () => {
    return async function (dispatch, getState) {
        let currentIndex = await dispatch(getAliveCharacter());

        let numberOfAllies = getState().characters.length;

        dispatch(isHelpReady(false));

        if (currentIndex + 1 === numberOfAllies) {
            dispatch({
                type: 'RESET_ATTACKER_INDEX'
            })
            dispatch(changeTurn('enemy'));
            dispatch(enemyTurn());
        } else {
            dispatch({
                type: 'INCREMENT_ATTACKER_INDEX'
            })
        }


    }
}

export const setActiveAbility = (abilityType, name) => {
    return function (dispatch, getState) {
        let currentAbility = getState().combat.activeAbility.name;
        if (name === currentAbility) {
            dispatch(resetActiveAbility())
        } else {
            dispatch({
                type: 'SET_ACTIVE_ABILITY',
                abilityType,
                name
            })
        }
    }
}

export const resetActiveAbility = () => {
    return function (dispatch) {
        dispatch({
            type: 'RESET_ACTIVE_ABILITY',
        })
    }
}

export const setActiveItem = (name) => {
    return function (dispatch) {
        dispatch({
            type: 'SET_ACTIVE_ITEM',
            name
        })
    }
}

export const resetActiveItem = () => {
    return function (dispatch) {
        dispatch({
            type: 'RESET_ACTIVE_ITEM',
        })
    }
}

export const incrementCombatTurn = () => dispatch => {
    dispatch({
        type: 'INCREMENT_COMBAT_TURN'
    })
}

export const changeTurn = (whoseTurn) => {
    return function (dispatch, getState) {
        if (whoseTurn === 'ally') {
            let i = 0;
            dispatch(incrementCombatTurn());
            dispatch(changeBuffsCounter());
            while (!getState().combat.gameOver && getState().characters[i].stats.hp < 1 && i < getState().characters.length) {
                dispatch({
                    type: 'INCREMENT_ATTACKER_INDEX'
                })
                i++;
                //albo przerwac kombat
                if (i === getState().characters.length) {
                    dispatch({
                        type: 'GAME_OVER'
                    })
                }
            }
        }
        dispatch({
            type: 'CHANGE_TURN',
            whoseTurn
        })
    }
}

//updates damage and status info during combat
export const addInfoToArray = (info) => {
    return function (dispatch) {
        dispatch({
            type: 'ADD_INFO_TO_ARRAY',
            info
        })
    }
}

export const setBattleBackground = (background) => (dispatch) => {
    dispatch({
        type: 'SET_BATTLE_BACKGROUND',
        background
    })
}

export const gameOver = () => dispatch =>{
    dispatch({
        type: 'GAME_OVER'
    })
}