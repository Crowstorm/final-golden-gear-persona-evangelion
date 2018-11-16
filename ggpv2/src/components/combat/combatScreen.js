import React from 'react';

import background from '../../assets/combat/backgrounds/battleBackground.png'

class CombatScreen extends React.Component {

    render() {
        return (
            <div className="combatScreen d-flex flex-wrap align-content-center justify-content-center" style={{   backgroundImage: { background },  }}>
                combat screen
            </div>
        )
    }
}

export default CombatScreen;