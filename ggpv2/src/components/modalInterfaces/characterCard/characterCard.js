import React, { useState } from 'react';
import _ from 'lodash';

import './characterCard.css';

import ItemImage from './itemImage';

export default class CharacterCard extends React.Component {
    state = {
        menu: 'items',
        charIndex: 0
    }

    getEq = () => {
        let char = this.props.characters[this.state.charIndex];
        let armor = char.armor;
        let weapon = char.weapon;

        let chest = char.armor.chest;
        let legs = char.armor.legs;
        let head = char.armor.head;
        return (
            <div className="characterEquipped d-flex flex-column align-items-center">
                <div>
                    <ItemImage img={head.img} equipped={true} />
                </div>
                <div>
                    <ItemImage img={chest.img} equipped={true} />
                    <ItemImage img={chest.img} equipped={true} />
                    <ItemImage img={chest.img} equipped={true} />
                </div>
                <div>
                    <ItemImage img={legs.img} equipped={true} />
                </div>
            </div>
        )
    }

    getInventory = () => {
        let { items, consumables } = this.props.characters[0];

        if (this.state.menu === 'items') {
            return _.map(items, (item, i) => {
                return (
                    <ItemImage key={i} index={this.state.charIndex} img={item.img} equip={this.props.equip} item={item} />
                )
            })
        }

        return _.map(consumables, (consum, i) => {
            return (
                <ItemImage key={i} img={consum.img} />
            )
        })
    }

    getPortraits = () => {
        let characters = this.props.characters;
        let border;

        return _.map(characters, (char, i) => {
            if (i === this.state.charIndex) {
                border = "3px solid green"
            } else {
                border = null
            }
            return <img key={char.name} src={char.portrait} style={{ width: 64, height: 64, border }} onClick={() => this.setState({ charIndex: i })} />
        })
    }

    handleChangeButtonClick = () => {
        if (this.state.menu === 'items') {
            this.setState({
                menu: 'consumables'
            })
        } else {
            this.setState({
                menu: 'items'
            })
        }
    }

    renderChangeButton = () => {
        let name = (this.state.menu === 'items') ? 'Consumables' : 'Items';

        return (
            <div onClick={() => { this.handleChangeButtonClick() }} className="woodenButton">
                {name}
            </div>
        )
    }

    render() {
        return (
            <div className="characterCard d-flex flex-row">
                <div className="characterCardLeftContainer d-flex flex-column">
                    <div className="portraitContainer d-flex flex-row">
                        {this.getPortraits()}
                    </div>
                    {this.getEq()}
                </div>

                <div className="characterCardRightContainer d-flex flex-column">
                    <div className="characterCardButtonContainer d-flex justify-content-center">
                        {this.renderChangeButton()}
                    </div>
                    <div className="inventoryContainer">
                        {this.getInventory()}
                    </div>
                </div>

            </div>
        )
    }
}