import _ from 'lodash';

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

export const updateQuestProgress = (questName, progressName, value) => (dispatch, getState) => {
    const questLog = getState().event.questLog;
    console.log({ questLog })
    let i = _.findIndex(questLog, { name: questName });
    if (i > -1) {
        dispatch({
            type: 'UPDATE_QUEST_PROGRESS',
            questName,
            progressName,
            value,
            i
        })
    }

}

