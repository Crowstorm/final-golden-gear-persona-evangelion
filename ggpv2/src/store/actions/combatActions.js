export const toggleCombat = () => (dispatch) => {
    dispatch({
        type: 'TOGGLE_COMBAT'
    })
}

export const isAttackReady = (isReady) => {
    return function (dispatch) {
        dispatch({
            type: 'IS_ATTACK_READY',
            isReady
        })
    }
};
export const isHelpReady = (isReady) => {
    return function (dispatch) {
        dispatch({
            type: 'IS_HELP_READY',
            isReady
        })
    }
};

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

export const changeTurn = (whoseTurn) => {
    return function (dispatch, getState) {
        console.log({ whoseTurn })
        // dispatch({
        //     type: 'INCREMENT_ATTACKER_INDEX'
        // })

        if (whoseTurn === 'ally') {
            let i = 0;
            while (getState().characters[i].stats.hp < 1 && i < 4) {
                dispatch({
                    type: 'INCREMENT_ATTACKER_INDEX'
                })
                i++;
                //albo przerwac kombat
                if (i === 5) {
                    dispatch({
                        type: 'CHANGE_TURN',
                        whoseTurn
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