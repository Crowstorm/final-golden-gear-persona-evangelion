import React from 'react';
import { connect } from 'react-redux';
import Level from '../components/overworld/levelRenderer';
import OverworldInterface from '../components/overworld/overworldInterface';

import { moveCharDown, moveCharUp, moveCharLeft, moveCharRight, setCharacterPosition } from '../store/actions/characterMovementActions';
import { toggleDialogueState } from '../store/actions/modalActions';
import { changeLevel } from '../store/actions/levelActions';


class OverworldContainer extends React.Component {
    render() {
        return (
            <div>
                <OverworldInterface {...this.props} />
                <Level {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        position: store.position,
        modal: store.modal,
        level: store.level,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //movement
        moveCharUp: () => { dispatch(moveCharUp()) },
        moveCharDown: () => { dispatch(moveCharDown()) },
        moveCharRight: () => { dispatch(moveCharRight()) },
        moveCharLeft: () => { dispatch(moveCharLeft()) },
        setCharacterPosition: (x, y) => { dispatch(setCharacterPosition(x, y)) },
        //modals
        toggleDialogueState: () => { dispatch(toggleDialogueState()) },
        //level mechanics
        changeLevel: (levelName) => { dispatch(changeLevel(levelName)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverworldContainer);