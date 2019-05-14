import React from 'react';
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
        let { chest, legs, head } = char.armor;
        // console.log(chest, legs, head);

        return (
            <div className="characterEquipped d-flex flex-column align-items-center">
                <div>
                    <ItemImage img={head.img} equipped={true} item={head} />
                </div>
                <div className="d-flex flex-row">
                    <ItemImage img={chest.img} equipped={true} item={chest} />
                    {/* <ItemImage img={chest.img} equipped={true} item={chest} />
                    <ItemImage img={chest.img} equipped={true} item={chest} /> */}
                </div>
                <div>
                    <ItemImage img={legs.img} equipped={true} item={legs} />
                </div>
            </div>
        )
    }

    sortItems = (items) => {
        let newItems = items.slice();
        return newItems.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
    }

    getInventory = () => {
        let { items, consumables } = this.props.characters[0];
        let newItems = this.sortItems(items)
        if (this.state.menu === 'items') {
            return _.map(newItems, (item, i) => {
                return (
                    <ItemImage key={i} i={i} index={this.state.charIndex} img={item.img} equip={this.props.equip} item={item} type='inventory' />
                )
            })
            // return <ItemImage key={"xD"} index={this.state.charIndex} img={items[0].img} equip={this.props.equip} item={items[0]} type='inventory' />
        }

        return _.map(consumables, (consum, i) => {
            return (
                <ItemImage key={i} img={consum.img} type="consumables" />
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
                    <div className="inventoryContainer d-flex flex-wrap">
                        {this.getInventory()}
                    </div>
                </div>

            </div>
        )
    }
}