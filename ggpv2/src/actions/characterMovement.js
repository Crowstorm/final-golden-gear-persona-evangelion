export const moveChar = (x, y) => {
    return function (dispatch) {
        const _x = x;
        const _y = y;
        dispatch({
            type: 'MOVE_CHAR',
            x: _x,
            y: _y
        })
    }
}

export const moveCharUp = () => {
    return function (dispatch) {
        dispatch({
            type: 'MOVE_CHAR_UP'
        })
    }
}

export const moveCharDown = () => {
    return function (dispatch) {
        dispatch({
            type: 'MOVE_CHAR_DOWN'
        })
    }
}

export const moveCharRight = () => {
    return function (dispatch) {
        dispatch({
            type: 'MOVE_CHAR_RIGHT'
        })
    }
}

export const moveCharLeft = () => {
    return function (dispatch) {
        dispatch({
            type: 'MOVE_CHAR_LEFT'
        })
    }
}