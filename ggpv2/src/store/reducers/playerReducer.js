import produce from "immer";

import * as skills from '../skills/skills';
import * as spells from '../skills/spells';

const playerDefaultState = {
    loading: false,
    isAuth: true,
    id: "5ce84dcbd3e8ae7de4415f73",
    username: 'admin5',
    savedGames: [],
    expTable: [
        // { exp: 100, boost: 2, newAbilities: [] },
        // { exp: 250, boost: 2, newAbilities: [] },
        // { exp: 500, boost: 2, newAbilities: [{ skill: skills.whimOfFate, type: 'skills' }, { skill: spells.healing, type: 'magic' }] },
        { exp: 1000, boost: 2, newAbilities: [] },
        { exp: 2000, boost: 2, newAbilities: [] },
        { exp: 4000, boost: 2, newAbilities: [] },
    ]
}

const playerReducer = (state = playerDefaultState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'SHIFT_EXP_TABLE': {
                draft.expTable.shift();
                break;
            }
            case 'GET_SAVES_DATA':
                draft.savedGames = action.saves;
                break;
            case 'PLAYER_LOGGED_IN':
                draft.isAuth = action.isAuth;
                draft.id = action.id;
                draft.username = action.username;
                draft.savedGames = action.savedGames;
                break;

            default: {
                return draft;
            }
        }
    });

}

export default playerReducer;