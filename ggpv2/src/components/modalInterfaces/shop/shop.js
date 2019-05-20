import React from 'react';
import "./shop.css"
import ItemImage from '../itemImage';

class ShopModal extends React.Component {
    state = {
        content: 'Buy'
    }

    shopContent = () => {
        const inventory = this.props.shop.shopInventory.inventory;
        if (inventory) {
            return inventory.map((item, i) => {
                return (
                    <ItemImage key={i} shop={true} item={item}/>
                )
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
            <div className="shopModal d-flex flex-column align-items-center">


                <div className="shopRightContainer d-flex flex-column">
                    <div className="characterCardButtonContainer d-flex justify-content-center">
                        {this.renderShopModeChangeButton()}
                    </div>
                    <div className="shopInventoryContainer d-flex flex-wrap">
                        {this.shopContent()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopModal;