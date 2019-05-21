import React from 'react';
import ReactTooltip from 'react-tooltip';

import Blank from "../../assets/interface/equipment/blank/blank.png";


class ItemImage extends React.Component {
    handleOnClick = () => {
        let { equipped, type, shop, item, buy } = this.props;
        if (!equipped) {
            if (type === 'inventory') {
                this.props.equip(this.props.index, this.props.item)
            } else if (type === 'consumables') {
                console.log('iksde')
            }
            if (shop) {
                this.props.buy(item)
            }
        }
    }

    renderImage = () => {
        if (this.props.item) {
            const { item, item: { name } } = this.props;
            return (
                <img
                    data-tip data-for={name + this.props.i}
                    src={item.icon}
                    style={{ width: 64, height: 64 }}
                    onClick={() => this.handleOnClick()}
                    alt="Item"
                />
            )
        }
    }

    renderTooltip = () => {
        if (this.props.item) {
            const { type } = this.props;
            if (type === "inventory" || this.props.equipped) {
                const { name, bonus: { defence, agility, strength, luck, magic, magicResist } } = this.props.item;
                return (
                    <ReactTooltip id={name + this.props.i} aria-haspopup='true' role='example' className="d-flex flex-column align-content-center align-items-center justify-content-center">
                        <p>{name}</p>
                        {(defence) ? <p>Defence: {defence}</p> : null}
                        {(agility) ? <p>Agility: {agility}</p> : null}
                        {(strength) ? <p>Strength: {strength}</p> : null}
                        {(luck) ? <p>Luck: {luck}</p> : null}
                        {(magic) ? <p>Magic: {magic}</p> : null}
                        {(magicResist) ? <p>Magic Resistance: {magicResist}</p> : null}
                    </ReactTooltip>
                )
            } else if (type === "consumables") {
                const { name, description } = this.props.item;
                return (
                    <ReactTooltip id={name + this.props.i} aria-haspopup='true' role='example' className="d-flex flex-column align-content-center align-items-center justify-content-center">
                        <p>{name}</p>
                        <p>{description}</p>
                    </ReactTooltip>
                )
            }
            if (this.props.shop) {
                const { name, description, price } = this.props.item;
                return (
                    <ReactTooltip id={name + this.props.i} aria-haspopup='true' role='example' className="d-flex flex-column align-content-center align-items-center justify-content-center">
                        <p>{name}</p>
                        <p>{description}</p>
                        <p>{price} gold</p>
                    </ReactTooltip>
                )
            }
        }
    }

    render() {
        return (
            <div style={{ width: 64, height: 64 }} className="characterCardItemSlot">
                {this.renderImage()}
                {this.renderTooltip()}
            </div>
        )
    }
}

export default ItemImage;