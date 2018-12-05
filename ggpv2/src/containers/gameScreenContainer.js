import React from 'react';
import { connect } from 'react-redux';

import { moveCharDown, moveCharUp, moveCharLeft, moveCharRight } from '../store/actions/characterMovementActions';
import { toggleDialogueState } from '../store/actions/modalActions';
import { changeLevel } from '../store/actions/levelActions';

import Level from '../components/overworld/levelRenderer';
import OverworldInterface from '../components/overworld/overworldInterface';
import CombatContainer from './combatContainer';

class GameScreenContainer extends React.Component {
    overworld = () => {
        return (
            <div>
                <OverworldInterface {...this.props} />
                <Level {...this.props} />
            </div>
        )
    }

    combat = () => {
        return (
            <CombatContainer {...this.props} />
        )
    }

    render() {
        let renderScreen = (this.props.combat.isCombat) ? this.combat() : this.overworld();
        return (
            <div>
                {/* {this.overworld()} */}
                {/* {this.combat()} */}
                {renderScreen}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        position: store.position,
        modal: store.modal,
        level: store.level,
        combat: store.combat
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //movement
        moveCharUp: () => { dispatch(moveCharUp()) },
        moveCharDown: () => { dispatch(moveCharDown()) },
        moveCharRight: () => { dispatch(moveCharRight()) },
        moveCharLeft: () => { dispatch(moveCharLeft()) },
        //modals
        toggleDialogueState: () => { dispatch(toggleDialogueState()) },
        //level mechanics
        changeLevel: (levelName) => { dispatch(changeLevel(levelName)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenContainer);