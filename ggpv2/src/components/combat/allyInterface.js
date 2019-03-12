import React from 'react';
import _ from 'lodash';

import * as skills from '../../store/skills/skills';
import * as items from '../../store/items/items';


import './combat.css';
import { Bar } from './bar';


class AllyInterface extends React.Component {

    useRestorationItem = (item, char, i) => {
        let currentHp = char.stats.hp;
        let currentMp = char.stats.mp;
        let maxHp = char.stats.maxHp;
        let maxMp = char.stats.maxMp;

        if (item.type === 'hp') {
            if (currentHp + item.amount < maxHp) {
                this.props.charRestore('hp', item.amount, i);
            } else {
                let toRestore = maxHp - currentHp;
                this.props.charRestore('hp', toRestore, i)
            }
        } else if (item.type === 'mp') {
            if (currentMp + item.amount < maxMp) {
                this.props.charRestore('mp', item.amount, i)
            } else {
                let toRestore = maxMp - currentMp;
                this.props.charRestore('mp', toRestore, i)
            }
        }
    }

    // does action depending on combat state (inventory check, buffs etc)
    handleAllyClicked = (i) => {
        let combat = this.props.combat;
        let attI = combat.attackerIndex;
        let character = this.props.ally[i];

        if (combat.helpReady && combat.whoseTurn === 'ally') {
            //item logic
            if (combat.activeItem.name) {
                //find item
                let itemName = _.findKey(items, { name: combat.activeItem.name });
                let item = items[itemName];
                switch (item.actionType) {
                    case 'restore':
                        this.useRestorationItem(item, character, i);
                        break;
                    default:
                        console.error('Unknown item type')
                }

                this.props.resetActiveItem();
                //usunac itemek
                this.props.charAbilityItemRemover('consumables', combat.activeItem.name, null)
                //skonczyc ture
                this.props.nextAllyTurn();
            }
        }
    }


    getCharacters = () => {
        const { ally } = this.props;
        return ally.map((char, i) => {
            return (
                <div key={char.name} className="d-flex flex-row" onClick={() => this.handleAllyClicked(i)}>
                    <div>
                        <Bar
                            // percentage={50}
                            max={char.stats.maxHp}
                            current={char.stats.hp}
                            type="health"
                            side="ally"
                        />
                    </div>

                    <div>
                        <div className="characterNameContainer d-flex justify-content-center">
                            {char.name}
                        </div>
                        <img className="characterPortrait" alt="ally" src={char.portrait} />
                    </div>

                    <Bar
                        max={char.stats.maxMp}
                        current={char.stats.mp}
                        type="mana"
                        side="ally"
                    />
                </div>
            )
        })
    }

    render() {
        let mainCharacters = this.getCharacters();
        return (
            <div className="allyInterface">
                {mainCharacters}
            </div>
        )
    }
}


export default AllyInterface;