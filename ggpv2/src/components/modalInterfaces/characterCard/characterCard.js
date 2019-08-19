import React from 'react';
import _ from 'lodash';
import HelmetSlot from "../../../assets/interface/equipment/blank/helmet_slot.png";

import './characterCard.css';

import ItemImage from '../itemImage';

export default class CharacterCard extends React.Component {
    state = {
        menu: 'items',
        charIndex: 0
    }

    getEq = () => {
        let char = this.props.characters[this.state.charIndex];
        let { chest, legs, head } = char.armor;

        return (
            <div className="characterEquipped d-flex flex-column align-items-center">
                <div>
                    {(head) ? <ItemImage equipped={true} item={head} i={0}/> : <img src={HelmetSlot} style={{ width: 64, height: 64 }} />}
                </div>
                <div className="d-flex flex-row">
                    <ItemImage equipped={true} item={chest} i={0}/>
                    <ItemImage equipped={true} item={chest} i={0}/>
                    <ItemImage equipped={true} item={chest} i={0}/>
                </div>
                <div>
                    <ItemImage equipped={true} item={legs} i={0}/>
                </div>
            </div>
        )
    }

    getStatistics = () => {
        const char = this.props.characters[this.state.charIndex];
        const { hp, maxHp, mp, maxMp } = char.stats;
        const gold = this.props.characters[0].gold;
        return (
            <div className="characterCardStats d-flex flex-row">
                <div>
                    <div className=" charactedCardSingleStat d-flex flex-row">
                        <img src="https://img1.androidappsapk.co/300/f/2/a/com.heartbattery.kc.png" />
                        <p>{hp}/{maxHp}</p>
                    </div>
                    <div className="charactedCardSingleStat d-flex flex-row">
                        <img src="https://cdn2.iconfinder.com/data/icons/retro-game-items-revamp-border/100/game_potion_mana_magic_flask_energy_elixir-512.png" />
                        <p>{mp}/{maxMp}</p>
                    </div>
                </div>
                <div className=" charactedCardSingleStat d-flex flex-row">
                    <img src="https://cdn2.iconfinder.com/data/icons/retro-game-items-revamp/100/coin_money_shop_spend_gold-512.png" />
                    <p>{gold}</p>
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
        const charIndex =this.state.charIndex;
        let { items, consumables } = this.props.characters[0];
        let newItems = this.sortItems(items);
        let newConsumables = this.sortItems(consumables);
        while (newItems.length < 18) {
            newItems.push('blank')
        }
        while (newConsumables.length < 18) {
            newConsumables.push('blank')
        }
        if (this.state.menu === 'items') {
            return _.map(newItems, (item, i) => {
                if (item === 'blank') {
                    return (
                        <ItemImage key={i} blank={true} />
                    )
                } else {
                    return (
                        <ItemImage key={i} i={i} index={this.state.charIndex} equip={this.props.equip} item={item} type='inventory' />
                    )
                }
            })

        }

        return _.map(newConsumables, (consum, i) => {
            if (consum === 'blank') {
                return (
                    <ItemImage key={i} blank={true} />
                )
            } else {
                return (
                    <ItemImage key={i} i={i} type="consumables" item={consum} charRestore={this.props.charRestore} charIndex={charIndex} removeItemFromInventory={this.props.removeItemOrAbility}/>
                )
            }
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
            <div onClick={() => { this.handleChangeButtonClick() }} className="eightbit-btn" style={{width: "80%", marginLeft: 16}}>
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
                    {this.getStatistics()}
                </div>

                <div className="characterCardRightContainer d-flex flex-column justify-content-center align-items-center">
                    {/* <div className="characterCardButtonContainer d-flex justify-content-center"> */}
                        {this.renderChangeButton()}
                    {/* </div> */}
                    <div className="inventoryContainer d-flex flex-wrap">
                        {this.getInventory()}
                    </div>
                </div>

            </div>
        )
    }
}