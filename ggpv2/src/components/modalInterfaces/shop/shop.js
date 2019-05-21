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
        const inventory = this.props.shop.shopInventory.inventory;
        let newInventory = this.sortItems(inventory);
        while (newInventory.length < 28) {
            newInventory.push('blank');
        }
        if (newInventory) {
            return newInventory.map((item, i) => {
                if (item === 'blank') {
                    return (
                        <ItemImage key={i} blank={true} />
                    )
                } else {
                    return (
                        <ItemImage key={i} shop={true} item={item} buy={this.props.buyItemFromShop}/>
                    )
                }

            })
        } else {
            return <div>Failed to load shop inventory.</div>
        }
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
                <div className="shopLeftContainer d-flex flex-column">

                </div>

                <div className="shopRightContainer d-flex flex-column">
                    <div className="characterCardButtonContainer d-flex justify-content-center">
                        {this.renderShopModeChangeButton()}
                    </div>
                    <div className="shopInventoryContainer d-flex flex-wrap justify-content-center">
                        {this.shopContent()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopModal;