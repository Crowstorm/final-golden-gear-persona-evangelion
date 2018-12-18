import React from 'react';

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

    componentDidMount = () => {
        this.boostStatsFromEquipment();
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