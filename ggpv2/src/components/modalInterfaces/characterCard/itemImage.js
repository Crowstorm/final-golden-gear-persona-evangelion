import React from 'react';
import ReactTooltip from 'react-tooltip'

class ItemImage extends React.Component {
    handleOnClick = () => {
        let { equipped, type } = this.props;
        if (!equipped) {
            if (type === 'inventory') {
                this.props.equip(this.props.index, this.props.item)
            } else if (type === 'consumables') {
                console.log('iksde')
            }
        }
    }

    renderImage = () => {
        let { name } = this.props.item;
        return (
            <img
                data-tip data-for={name + this.props.i}
                src={this.props.img}
                style={{ width: 64, height: 64 }}
                onClick={() => this.handleOnClick()}
                alt="Item"
            />
        )
    }

    renderTooltip = () => {
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

    }
    render() {
        return (
            <div style={{ width: 64, height: 64 }}>
                {this.renderImage()}
                {this.renderTooltip()}
            </div>
        )
    }
}

export default ItemImage;