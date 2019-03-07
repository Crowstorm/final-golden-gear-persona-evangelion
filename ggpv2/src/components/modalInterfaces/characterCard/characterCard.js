import React, { useState } from 'react';
import _ from 'lodash';

import './characterCard.css';

import ItemImage from './itemImage';

export default class CharacterCard extends React.Component {
    state = {
        menu: 'items'
    }

    getEq = () => {
        let char = this.props.characters[0];
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
                    <ItemImage key={i} img={item.img} equip={this.props.equip} item={item} />
                )
            })
        }

        return _.map(consumables, (consum, i) => {
            return (
                <ItemImage key={i} img={consum.img} />
            )
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
            <button onClick={() => { this.handleChangeButtonClick() }}>{name}</button>
        )
    }

    render() {
        this.getInventory();
        return (
            <div className="characterCard d-flex flex-row">
                <div className="eqContainer">
                    {this.getEq()}
                </div>
                <div className="characterCardButtonContainer">
                    {this.renderChangeButton()}
                </div>
                <div className="inventoryContainer">
                    {this.getInventory()}
                </div>
            </div>
        )
    }
}