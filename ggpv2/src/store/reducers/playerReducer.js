import produce from "immer";


const playerDefaultState = {
    loading: false,
    isAuth: true,
    id: "5c767c650577d047f076c054",
    username: null,
    savedGames: [],
    expTable: [
        { exp: 100, boost: 2 },
        { exp: 250, boost: 2 },
        { exp: 500, boost: 2 },
        { exp: 1000, boost: 2 },
    ]
}

const playerReducer = (state = playerDefaultState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'SHIFT_EXP_TABLE': {
                draft.expTable.shift();
                break;
            }
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