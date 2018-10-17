export const toggleDialogueState = () =>{
    return function (dispatch) {
        dispatch({
            type: 'TOGGLE_DIALOGUE'
        })
    }
}