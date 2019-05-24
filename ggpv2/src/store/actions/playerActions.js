import axios from 'axios'

export const register = (username, password) => (dispatch) => {
    console.log(username, password)
    const form = { username, password }
    // axios.post('https://fggpe-server.herokuapp.com/signup', form).then(res => {
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
        // axios.post('https://fggpe-server.herokuapp.com/login', form).then(res => {
        console.log(res)
        if (res.data.success) {
            dispatch({
                type: 'PLAYER_LOGGED_IN',
                isAuth: true,
                id: res.data.user._id,
                username: res.data.user.username,
                savedGames: res.data.user.savedGames,
            })
        }
    }).catch(err => {
        console.error(err)
    })
}

export const saveGame = (slot) => (dispatch, getState) => {
    //get all reducers
    const characterState = getState().characters;
    const combatState = getState().combat;
    const enemyState = getState().enemy;
    const eventState = getState().event;
    const levelState = getState().level;
    const positionState = getState().position;
    const modalState = getState().modal;
    const shopState = getState().shop;
    const id = getState().player.id;
    const username = getState().player.username;

    const gameData = {
        id,
        username,
        data: {
            saveSlot: slot,
            characterState,
            combatState,
            enemyState,
            eventState,
            levelState,
            positionState,
            modalState,
            shopState,
        }
    }

    axios.post('/saveGame', gameData).then(res => {
        console.log({ res })
    })
}