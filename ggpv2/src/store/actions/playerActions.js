import axios from 'axios'

export const register = (username, password) => (dispatch) => {
    console.log(username, password)
    const form = { username, password }
    axios.post('http://localhost:5000/signup', form).then(res => {
        console.log(res)
        if (res.data.success) {
            console.log('register complete')
        }
    }).catch(err => {
        console.error(err)
    })
}

export const login = (username, password) => (dispatch) => {
    const form = { username, password }
    axios.post('/login', form).then(res => {
        console.log(res)
        if (res.data.success) {
            console.log('login complete')
        }
    }).catch(err => {
        console.error(err)
    })
}

export const saveGame = () => (dispatch, getState) => {
    //get all reducers
    const characterState = getState().characters;
    const combatState = getState().combat;
    const enemyState = getState().enemy;
    const eventState = getState().event;
    const levelState = getState().level;
    const positionState = getState().position;
    const modalState = getState().modal;
    const shopState = getState().shop;

    const gameData = {
        characterState,
        combatState,
        enemyState,
        eventState,
        levelState,
        positionState,
        modalState,
        shopState,
    }

    console.log({gameData})
}