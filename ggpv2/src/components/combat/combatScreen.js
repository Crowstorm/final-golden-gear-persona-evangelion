import React from 'react';
import _ from 'lodash';

import background from '../../assets/combat/backgrounds/battleBackground.png';

import AttackInterface from './attackInterface';

class CombatScreen extends React.Component {

    //At the start of combat boost allies statistics depending on equipment they use
    boostStatsFromEquipment = () => {
        let characters = this.props.ally;

        characters.forEach((char, i) => {
            let armor = char.armor;
            let weapon = char.weapon;
            //armor bonus
            if (armor) {
                Object.entries(armor).forEach(([key, val]) => {
                    let bonuses = val.bonus
                    Object.entries(bonuses).forEach(([key, val]) => {
                        this.props.boostStat(key, val, i)
                    })
                })
            }
            //weapon bonus
            if (weapon) {
                console.log(weapon)
                Object.entries(weapon.bonus).forEach(([key, val]) => {
                    this.props.boostStat(key, val, i)
                })

            }
        })
    }

    findCharacter = (name) => {
        const characters = this.props.characters;
        console.log(characters, name)
        let i = _.findIndex(characters, { name: name });
        if (i > -1) {
            return characters[i];
        }
    }

    checkConditions = (condition) => {
        if (condition.type === 'hp') {
            const char = this.findCharacter(condition.name)
            if (char.stats.hp <= char.stats.maxHp * condition.percentage) {
                return true;
            }
        }

        return false;
    }

    componentDidMount = () => {
        this.boostStatsFromEquipment();
    }

    componentDidUpdate = () => {
        const combatTriggers = this.props.event.combatTriggers;
        combatTriggers.forEach((trigger, i) => {
            // trigger[0].effect();
            const areConditionsMet = this.checkConditions(trigger.condition);
            if (areConditionsMet) {
                trigger.effect();
                //delete the effect
                this.props.removeCombatTrigger(i)
            }
        })
    }

    render() {
        return (
            <div className="combatScreen d-flex flex-wrap align-content-center justify-content-center" style={{ backgroundImage: { background }, }}>
                <AttackInterface {...this.props} />
            </div>
        )
    }
}

export default CombatScreen;