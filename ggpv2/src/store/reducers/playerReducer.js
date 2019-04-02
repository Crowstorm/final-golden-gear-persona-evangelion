import produce from "immer";


const playerDefaultState = {
    isAuth: true,
    id: null,
    login: null,
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

            default: {
                return draft;
            }
        }
    });

}

export default playerReducer;