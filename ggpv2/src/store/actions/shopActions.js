export const loadShopInventory = (shopInventory) => (dispatch, getState) =>{
    dispatch({
        type: 'LOAD_SHOP_INVENTORY',
        shopInventory
    })
}