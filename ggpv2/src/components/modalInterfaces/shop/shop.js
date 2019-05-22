import React from 'react';
import "./shop.css"
import ItemImage from '../itemImage';

class ShopModal extends React.Component {
    state = {
        content: 'Buy'
    }

    sortItems = (items) => {
        let newItems = items.slice();
        return newItems.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
    }

    shopContent = () => {
        if (this.state.content === 'Buy') {
            const inventory = this.props.shop.shopInventory.inventory;
            let newInventory = this.sortItems(inventory);
            while (newInventory.length < 28) {
                newInventory.push('blank');
            }
            return newInventory.map((item, i) => {
                if (item === 'blank') {
                    return (
                        <ItemImage key={i} i={i} blank={true} />
                    )
                } else {
                    return (
                        <ItemImage key={i} i={i} shop={true} item={item} buySell={this.props.buyItemFromShop} />
                    )
                }

            })
        } else if (this.state.content === 'Sell') {
            const consumables = this.props.characters[0].consumables;
            const items = this.props.characters[0].items;
            let newInventory = [];
            consumables.forEach(consumable=>{
                newInventory.push(consumable)
            })
            items.forEach(item=>{
                newInventory.push(item)
            })
            newInventory = this.sortItems(newInventory);
            while (newInventory.length < 28) {
                newInventory.push('blank');
            }
            return newInventory.map((item, i) => {
                if (item === 'blank') {
                    return (
                        <ItemImage key={i} i={i} blank={true} />
                    )
                } else {
                    return (
                        <ItemImage key={i} i={i} shop={true} item={item} buySell={this.props.sellItemToShop} />
                    )
                }

            })
        }
    }

    renderCurrentGold = () => {
        const gold = this.props.characters[0].gold;
        return (
            <div className=" shopSingleStat d-flex flex-row align-content-center">
                <img src="https://cdn2.iconfinder.com/data/icons/retro-game-items-revamp/100/coin_money_shop_spend_gold-512.png" style={{ height: "32px" }} />
                <p>{gold}</p>
            </div>
        )
    }

    handleShopModeChangeButtonClick = (mode) => {
        this.setState({
            content: mode
        })
    }
    renderShopModeChangeButton = () => {
        let name = (this.state.content === 'Buy') ? 'Sell' : 'Buy';

        return (
            <div onClick={() => { this.handleShopModeChangeButtonClick(name) }} className="woodenButton">
                {name}
            </div>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div className="shopModal d-flex flex-row">
                {/* <div className="shopLeftContainer d-flex flex-column">
                    <img src="https://wolna-polska.pl/wp-content/uploads/2013/07/a5.gif" />
                </div> */}

                <div className="shopRightContainer d-flex flex-column">
                    <div className="characterCardButtonContainer d-flex justify-content-center">
                        {this.renderShopModeChangeButton()}
                    </div>
                    <div className="shopInventoryContainer d-flex flex-wrap justify-content-center">
                        {this.shopContent()}
                    </div>
                    {this.renderCurrentGold()}
                </div>
            </div>
        )
    }
}

export default ShopModal;