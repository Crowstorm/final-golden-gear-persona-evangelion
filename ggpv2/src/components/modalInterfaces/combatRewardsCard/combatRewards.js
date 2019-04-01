import React from 'react';
import './combatRewards.css';

class CombatRewards extends React.Component {
    handleCloseCombatRewardsScreen = () => {
        this.props.toggleCombat();
        this.props.toggleCombatRewardsCard();
    }

    renderRewards = () =>{
        let {exp, items, gold} = this.props.combat.reward;
        return(
            <div>
                {exp}
                {gold}
            </div>
        )
    }

    render() {
        console.log(this.props.player)
        return (
            <div className="combatRewards d-flex flex-column align-items-center">
                Wygrałeś ziomeczku
                {this.renderRewards()}
                <button onClick={() => this.handleCloseCombatRewardsScreen()}>Koniec</button>
            </div>
        )
    }
}

export default CombatRewards;