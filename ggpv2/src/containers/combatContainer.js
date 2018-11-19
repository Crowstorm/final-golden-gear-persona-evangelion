import React from 'react';
import { connect } from 'react-redux';

import CombatScreen from '../components/combat/combatScreen';
import AllyInterface from '../components/combat/allyInterface';
import EnemyInterface from '../components/combat/enemyInterface';
import InfoPanel from '../components/combat/infoPanel';

import {isAttackReady} from '../store/actions/combatActions';
import {enemyLoseHp} from '../store/actions/enemyActions';


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
        ally: store.characters,
        enemy: store.enemy,
        combat: store.combat
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isAttackReady: (isReady) =>{
            dispatch(isAttackReady(isReady))
        },
        enemyLoseHp: (hp, i) =>{
            dispatch(enemyLoseHp(hp, i))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatContainer);