import React from 'react';
import { connect } from 'react-redux';

import CombatScreen from '../components/combat/combatScreen';
import AllyInterface from '../components/combat/allyInterface';
import EnemyInterface from '../components/combat/enemyInterface';
import InfoPanel from '../components/combat/infoPanel';


class CombatContainer extends React.Component {
    render() {
        return (
            <div>
                <CombatScreen {...this.props} />
                <AllyInterface {...this.props} />
                <EnemyInterface {...this.props} />
                <InfoPanel {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatContainer);