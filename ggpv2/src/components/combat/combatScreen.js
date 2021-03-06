import React from 'react';
import _ from 'lodash';

import AttackInterface from './attackInterface';

class CombatScreen extends React.Component {

    componentDidMount = () => {
        this.boostStatsFromEquipment();
    }

    componentDidUpdate = () => {
        this.checkForTriggers();
    }

    componentWillUnmount = () => {
        this.loseStatsFromEquipment();
    }

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
                Object.entries(weapon.bonus).forEach(([key, val]) => {
                    this.props.boostStat(key, val, i)
                })

            }
        })
    }

    loseStatsFromEquipment = () => {
        let characters = this.props.ally;

        characters.forEach((char, i) => {
            let armor = char.armor;
            let weapon = char.weapon;
            //armor bonus
            if (armor) {
                Object.entries(armor).forEach(([key, val]) => {
                    let bonuses = val.bonus
                    Object.entries(bonuses).forEach(([key, val]) => {
                        this.props.boostStat(key, -val, i)
                    })
                })
            }
            //weapon bonus
            if (weapon) {
                Object.entries(weapon.bonus).forEach(([key, val]) => {
                    this.props.boostStat(key, -val, i)
                })

            }
        })
    }

    findCharacter = (name) => {
        const characters = this.props.characters;
        let i = _.findIndex(characters, { name: name });
        if (i > -1) {
            return characters[i];
        }
    }

    checkCurrentTurnNumber = () => {
        const turn = this.props.combat.combatTurn;
        return turn;
    }

    checkForTriggers = () => {
        const combatTriggers = this.props.event.combatTriggers;
        combatTriggers.forEach((trigger, i) => {
            const areConditionsMet = this.checkConditions(trigger.condition);
            if (areConditionsMet) {
                trigger.effect();
                this.props.removeCombatTrigger(i)
            }
        })
    }

    checkConditions = (condition) => {
        if (condition.type === 'hp') {
            const char = this.findCharacter(condition.name)
            if (char.stats.hp <= char.stats.maxHp * condition.percentage) {
                return true;
            }
        } else if (condition.type === 'turn') {
            const turn = this.checkCurrentTurnNumber();
            if (turn === condition.turn) {
                return true;
            }
        }

        return false;
    }

    renderBattleBackground = () => {
        const background = this.props.combat.battleBackground;
        return background;
    }

    render() {
        const background = this.renderBattleBackground();
        return (
            <div className="combatScreen d-flex flex-wrap align-content-center justify-content-center" style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <AttackInterface {...this.props} />
            </div>
        )
    }
}

export default CombatScreen;