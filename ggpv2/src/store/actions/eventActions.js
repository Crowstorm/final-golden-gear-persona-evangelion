import _ from 'lodash';
import * as quests from '../quests/quests';

export const setCurrentQuest = (name) => (dispatch) => {
    dispatch(pushToQuestList(name))
    dispatch({
        type: 'SET_CURRENT_QUEST',
        quest: name
    })
}

const checkIfQuestAlreadyTaken = (name) => (dispatch, getState) => {
    const questLog = getState().event.questLog;
    let i = _.findIndex(questLog, { name: quests[name].name });
    if (i > -1) {
        return true;
    }
    return false;
}

export const pushToQuestList = (name) => dispatch => {
    const isQuestTaken = dispatch(checkIfQuestAlreadyTaken(name));
    if (isQuestTaken) {
        return;
    }
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

export const addCombatTriggers = (combatTriggers) => dispatch => {
    dispatch({
        type: 'UPDATE_COMBAT_TRIGGERS',
        combatTriggers
    })
}

