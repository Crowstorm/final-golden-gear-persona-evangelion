export const isAttackReady = (isReady) => {
    return function (dispatch) {
        dispatch({
            type: 'IS_ATTACK_READY',
            isReady
        })
    }
};

export const changeTurn = (whoseTurn) => {
    return function (dispatch, getState) {
        console.log({ whoseTurn })
        // dispatch({
        //     type: 'INCREMENT_ATTACKER_INDEX'
        // })

        if(whoseTurn === 'ally'){
            let i = 0;
            while(getState().characters[i].stats.hp < 1){
                dispatch({
                    type: 'INCREMENT_ATTACKER_INDEX'
                })
                i++;
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