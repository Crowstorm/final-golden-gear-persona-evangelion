import React from 'react';
import _ from 'lodash';

import './characterCard.css';

import ItemImage from './itemImage';

export default class CharacterCard extends React.Component {

    // getInventory = () => {
    //     let inventory = this.props.characters[0].
    // }

    getEq = () => {
        let char = this.props.characters[0];
        let armor = char.armor;
        let weapon = char.weapon;

        let chest = char.armor.chest;
        let legs = char.armor.legs;
        let head = char.armor.head;
        return (
            <div>
                <ItemImage img={chest.img} />
                <ItemImage img={legs.img} />
                <ItemImage img={head.img} />
                {/* <img src={chest.img} style={{ width: 100, height: 100 }} />
                <img src={legs.img} style={{ width: 100, height: 100 }} />
                <img src={head.img} style={{ width: 100, height: 100 }} /> */}
            </div>
        )
    }
    render() {
        // console.log('propsy character card', this.props.characters)
        // this.getEq()
        return (
            <div className="characterCard">
                Character card
                {this.getEq()}
            </div>
        )
    }
}