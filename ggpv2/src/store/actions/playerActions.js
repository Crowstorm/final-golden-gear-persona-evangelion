import axios from 'axios';

import { API_URL } from '../../config/config';
import { toggleGameData } from './modalActions';

export const register = (username, password) => (dispatch) => {
    const form = { username, password }
    // axios.post('https://fggpe-server.herokuapp.com/signup', form).then(res => {
    axios.post(`${API_URL}/signup`, form).then(res => {
        console.log(res)
        if (res.data.success) {
            console.log('register complete');
            window.location.reload();

        }
    }).catch(err => {
        console.error(err)
    })
}

const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

export const login = (username, password) => (dispatch) => {
    const form = { username, password }
    axios.post(`${API_URL}/login`, form, config).then(res => {
        // axios.post('https://fggpe-server.herokuapp.com/login', form).then(res => {
        if (res.data.success) {
            dispatch({
                type: 'PLAYER_LOGGED_IN',
                isAuth: true,
                id: res.data.user._id,
                username: res.data.user.username,
                savedGames: res.data.user.savedGames,
            })
            // dispatch(toggleGameData('load'));
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

    axios.post(`${API_URL}/saveGame`, gameData).then(res => {
        dispatch(getSavesData())
    })
}

export const getSavesData = () => (dispatch, getState) => {
    const id = getState().player.id;

    const data = {
        id: id
    }

    axios.post(`${API_URL}/getSavesData`, data).then(res => {
        if (res.data.success) {
            dispatch({
                type: 'GET_SAVES_DATA',
                saves: res.data.gameData
            })
        }

    }).catch(err => {
        console.log({ err })
    })
}

export const loadGame = (i) => (dispatch, getState) => {
    const id = getState().player.id;
    const data = {
        id: id,
        saveSlot: i
    }

    axios.post(`${API_URL}/loadGame`, data).then(res => {
        if (res.data.success) {
            const { characterState, combatState, eventState, levelState, modalState, positionState, shopState } = res.data.gameData;
            dispatch({
                type: 'LOAD_GAME',
                combatState,
                characterState,
                eventState,
                levelState,
                // modalState,
                positionState,
                // shopState
            })
            dispatch(toggleGameData());
        }
    }).catch(err => {
        console.log({ err })
    })
}

export const checkAuth = () => dispatch => {
    axios.get(`${API_URL}/current_user`).then(res => {
        if (res.data) {
            dispatch({
                type: 'PLAYER_LOGGED_IN',
                isAuth: true,
                id: res.data._id,
                username: res.data.username,
                savedGames: res.data.savedGames,
            })
        }
    }).catch(err => {
        console.log({ err })
    })
}

export const logout = () => dispatch => {
    axios.get(`${API_URL}/api/logout`).then(res => {
        window.location.reload();
    }).catch(err => {
        console.log({ err })
    })
}