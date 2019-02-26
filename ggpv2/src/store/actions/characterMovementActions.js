export const setCharacterPosition = (x, y) => {
    return function (dispatch) {
        dispatch({
            type: 'SET_CHARACTER_POSITION',
            x,
            y
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