export const setCurrentQuest = (name) => (dispatch) => {
    dispatch(pushToQuestList(name))

    dispatch({
        type: 'SET_CURRENT_QUEST',
        quest: name
    })
}

export const pushToQuestList = (name) => dispatch => {
    dispatch({
        type: 'PUSH_TO_QUEST_LIST',
        quest: name
    })
}