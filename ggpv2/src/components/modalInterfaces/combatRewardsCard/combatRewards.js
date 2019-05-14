import React from 'react';
import './combatRewards.css';

class CombatRewards extends React.Component {
    handleCloseCombatRewardsScreen = () => {
        this.props.toggleCombat();
        this.props.toggleCombatRewardsCard();
    }

    renderItemRewards = () => {
        const { items } = this.props.combat.reward;
        if (items.length > 0) {

        } else {
            return <p>You haven't found anything of use.</p>
        }
    }
    renderRewards = () => {
        let { exp, gold } = this.props.combat.reward;
        let expText = (exp) ? <p>Each party member gained {exp} experiance points.</p> : null;
        let goldText = (gold) ? <p>You've found {gold} gold in enemy's pouch.</p> : null;

        return (
            <div className="d-flex flex-column align-items-center">
                {expText}
                {goldText}
                {this.renderItemRewards()}
            </div>
        )
    }

    render() {
        return (
            <div className="combatRewards d-flex flex-column align-items-center">
                <h2>You have defeated your enemies!</h2>
                {this.renderRewards()}
                <button onClick={() => this.handleCloseCombatRewardsScreen()}>Close</button>
            </div>
        )
    }
}

export default CombatRewards;