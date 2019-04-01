import React from 'react';
import { connect } from 'react-redux';
import CombatRewards from '../../components/modalInterfaces/combatRewardsCard/combatRewards';

import { toggleCombatRewardsCard } from '../../store/actions/modalActions';
import {toggleCombat} from '../../store/actions/combatActions';

class CombatRewardsContainer extends React.Component {
    render() {
        return (
            <div>
                <CombatRewards {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        modal: store.modal,
        combat: store.combat,
        player: store.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCombatRewardsCard: () => {
            dispatch(toggleCombatRewardsCard());
        },
        toggleCombat: () => {
            dispatch(toggleCombat())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatRewardsContainer);