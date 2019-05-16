import React from 'react';
import _ from 'lodash';

import * as skills from '../../store/skills/skills';
import * as spells from '../../store/skills/spells';
import * as items from '../../store/items/items';


import './combat.css';
import { Bar } from './bar';
import BuffIcon from './helperComponents/buffIcon';


class AllyInterface extends React.Component {

    payAbilityPrice = (ability, i) => {
        let char = this.props.ally[i];
        if (ability.costType === 'mp') {
            if (ability.costDataType === 'int') {
                this.props.allyLoseMana(ability.cost, i)
            } else {
                let mana = char.stats.maxMp;
                let price = mana * (ability.cost / 100);
                this.props.allyLoseMana(price, i)
            }

        } else {
            if (ability.costDataType === 'int') {
                this.props.allyLoseHp(ability.cost, i)
            } else {
                let hp = char.stats.maxHp;
                let price = hp * (ability.cost / 100);
                this.props.allyLoseHp(price, i)
            }
        }
    }


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

    useRestorationAbility = (ability, char, i) => {
        let attI = this.props.combat.attackerIndex;
        let currentHp = char.stats.hp;
        let currentMp = char.stats.mp;
        let maxHp = char.stats.maxHp;
        let maxMp = char.stats.maxMp;

        if (ability.restore === 'hp') {
            if (currentHp + ability.dmg < maxHp) {
                this.props.charRestore('hp', ability.dmg, i);
            } else {
                let toRestore = maxHp - currentHp;
                this.props.charRestore('hp', toRestore, i)
            }
        } else if (ability.restore === 'mp') {
            if (currentMp + ability.dmg < maxMp) {
                this.props.charRestore('mp', ability.dmg, i);
            } else {
                let toRestore = maxMp - currentMp;
                this.props.charRestore('mp', toRestore, i)
            }
        }

        this.payAbilityPrice(ability, attI)
    }

    useBuffAbility = (ability, char, i) => {
        let attI = this.props.combat.attackerIndex;
        let newBuffs = [];
        //trza bedzie pobrac obecne i dopisac
        if (ability.boostType === "flat") {
            // newBuffs = [
            //     {
            //         amount: 5,
            //         duration: 2,
            //         stat: "defence"
            //     }
            // ]
            if (ability.boost && ability.boost[0] && ability.boost[0] === 'all') {

            } else {
                ability.boost.forEach(boost => {
                    const newBuff = {
                        amount: ability.boostAmount,
                        duration: ability.boostDuration,
                        stat: boost
                    }
                    newBuffs.push(newBuff);
                })
            }
            this.props.applyBuff(newBuffs, i);
        }

        this.payAbilityPrice(ability, attI)
    }

    // does action depending on combat state (inventory check, buffs etc)
    handleAllyClicked = (i) => {
        let combat = this.props.combat;
        let attI = combat.attackerIndex;
        let character = this.props.ally[i];

        if (combat.helpReady && combat.whoseTurn === 'ally') {
            //item logic
            if (combat.activeItem.name) {
                let itemName = _.findKey(items, { name: combat.activeItem.name });
                let item = items[itemName];

                switch (item.actionType) {
                    case 'restore':
                        if (character.stats.hp <= 0) return;
                        this.useRestorationItem(item, character, i);
                        break;
                    default:
                        console.error('Unknown item type')
                }
                this.props.resetActiveItem();
                //usunac itemek
                this.props.removeItemOrAbility('consumables', combat.activeItem.name, 0)
                //skonczyc ture
                this.props.nextAllyTurn();
            }

            //spell logic
            if (combat.activeAbility.name) {
                let type = (combat.activeAbility.type === 'magic') ? spells : skills;
                let skillName = _.findKey(type, { name: combat.activeAbility.name });
                let ability = type[skillName];

                switch (ability.helpType) {
                    case 'restore':
                        if (character.stats.hp <= 0) return;
                        this.useRestorationAbility(ability, character, i);
                        break;
                    case 'buff':
                        this.useBuffAbility(ability, character, i);
                        break;
                    default:
                        console.error('Unknown ability type')
                }

                this.props.resetActiveAbility();
                this.props.nextAllyTurn();
            }
        }
    }

    renderBuffIcons = (i) => {
        const buffs = this.props.ally[i].buffs;
        if (buffs && buffs.length > 0) {
            return buffs.map((buff, i) => {
                return <BuffIcon key={i} buff={buff} />
            })
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
                        <div className="buffIconContainer d-flex flex-row">
                            {this.renderBuffIcons(i)}
                        </div>
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