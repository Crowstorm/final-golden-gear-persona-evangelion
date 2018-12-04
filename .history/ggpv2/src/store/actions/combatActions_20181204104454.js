export const isAttackReady = (isReady) => {
    return function (dispatch) {
        dispatch({
            type: 'IS_ATTACK_READY',
            isReady
        })
    }
};

export const changeTurn = (whoseTurn) => {
    return function (dispatch) {
        console.log({ whoseTurn })
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