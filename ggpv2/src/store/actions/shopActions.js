import _ from 'lodash';
import { removeItemOrAbility, addItemOrAbility, alterGoldAmount } from './characterActions';

export const loadShopInventory = (shopInventory) => (dispatch, getState) => {
    dispatch({
        type: 'LOAD_SHOP_INVENTORY',
        shopInventory
    })
}

const removeItemFromShopInventory = (item) => (dispatch, getState) => {
    const inventory = getState().shop.shopInventory.inventory;
    const i = _.findIndex(inventory, { name: item.name });
    dispatch({
        type: 'REMOVE_ITEM_FROM_SHOP_INVENTORY',
        i
    })
}
const addItemToShopInventory = (item) => (dispatch, getState) => {
    dispatch({
        type: 'ADD_ITEM_TO_SHOP_INVENTORY',
        item
    })
}

export const buyItemFromShop = (item) => (dispatch, getState) => {
    const ownedGold = getState().characters[0].gold;
    if (ownedGold < item.price) {
        console.log('biedak')
    } else {
        //take gold
        dispatch(alterGoldAmount(-item.price))
        //addItem to player
        dispatch(addItemOrAbility(item.itemType, item));
        //remove item from shop
        dispatch(removeItemFromShopInventory(item))
    }
}

export const sellItemToShop = (item) => (dispatch, getState) => {
        const shopCut = getState().shop.shopCut;
        //give gold
        dispatch(alterGoldAmount(item.price * shopCut))
        //addItem to player
        dispatch(removeItemOrAbility(item.itemType, item));
        //remove item from shop
        dispatch(addItemToShopInventory(item))
    
}

