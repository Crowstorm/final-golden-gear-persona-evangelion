import produce from "immer";

let initial_state = {
    shopInventory: [],
    archivedShopInventory: []
}

export default (state = initial_state, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'LOAD_SHOP_INVENTORY': {
                draft.shopInventory = action.shopInventory;
                break;
            }
            default: {
                return draft;
            }
        }
    });
}