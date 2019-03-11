export const toggleDialogueState = () =>{
    return function (dispatch) {
        dispatch({
            type: 'TOGGLE_DIALOGUE'
        })
    }
}
export const toggleCharacterCard = () =>{
    return function (dispatch) {
        dispatch({
            type: 'TOGGLE_CHARACTER_CARD'
        })
    }
}