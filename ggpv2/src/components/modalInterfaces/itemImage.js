import React from 'react';
import ReactTooltip from 'react-tooltip';

import Blank from "../../assets/interface/equipment/blank/blank.png";


class ItemImage extends React.Component {
    handleOnClick = () => {
        let { equipped, type, shop, item, buySell, charRestore, charIndex, removeItemFromInventory } = this.props;
        if (!equipped) {
            if (type === 'inventory') {
                this.props.equip(this.props.index, this.props.item)
            } else if (type === 'consumables') {
                charRestore(item.type, item.amount, charIndex);
                removeItemFromInventory(type, item);
            }
            if (shop) {
                buySell(item)
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
                const { name, bonus, description, price } = this.props.item;

                if (bonus) {
                    const { defence, agility, strength, luck, magic, magicResist } = bonus;
                    return (
                        <ReactTooltip id={name + this.props.i} aria-haspopup='true' role='example' className="d-flex flex-column align-content-center align-items-center justify-content-center">
                            <p>{name}</p>
                            <p>{description}</p>
                            {(defence) ? <p>Defence: {defence}</p> : null}
                            {(agility) ? <p>Agility: {agility}</p> : null}
                            {(strength) ? <p>Strength: {strength}</p> : null}
                            {(luck) ? <p>Luck: {luck}</p> : null}
                            {(magic) ? <p>Magic: {magic}</p> : null}
                            {(magicResist) ? <p>Magic Resistance: {magicResist}</p> : null}
                            <p>{(this.props.selling) ? price / 2 : price} gold</p>
                        </ReactTooltip>
                    )
                }

                return (
                    <ReactTooltip id={name + this.props.i} aria-haspopup='true' role='example' className="d-flex flex-column align-content-center align-items-center justify-content-center">
                        <p>{name}</p>
                        <p>{description}</p>
                        <p>{(this.props.selling) ? price / 2 : price} gold</p>
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