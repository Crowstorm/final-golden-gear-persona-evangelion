import React from 'react';

import background from '../../assets/combat/backgrounds/battleBackground.png';

import AttackInterface from './attackInterface';

class CombatScreen extends React.Component {

    render() {
        return (
            <div className="combatScreen d-flex flex-wrap align-content-center justify-content-center" style={{ backgroundImage: { background }, }}>
                <AttackInterface {...this.props} />
            </div>
        )
    }
}

export default CombatScreen;