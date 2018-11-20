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

export const startCombat = () => {
    return function (dispatch, getState) {
        let allyPickTargetPromise = new Promise(resolve => {
            let handleKeyDown = (e) => {
                if (getState().combat.whoseTurn === "enemy") {
                    let i = 'dziala'
                    resolve(i)
                }
                //Logika prawdopodobnie przeniesiona
                if (getState().enemy.length === 0) {
                    return 0;
                }
            }
            document.addEventListener("mousedown", handleKeyDown);
        })
        allyPickTargetPromise.then((resp) => {
            console.log('WESZLA ENEMY')
        })
    }
}