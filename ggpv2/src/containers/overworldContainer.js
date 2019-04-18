import React from 'react';
import { connect } from 'react-redux';
import Level from '../components/overworld/levelRenderer';
import OverworldInterface from '../components/overworld/overworldInterface/overworldInterface';

import { moveCharDown, moveCharUp, moveCharLeft, moveCharRight, setCharacterPosition } from '../store/actions/characterMovementActions';
import { toggleDialogueState, toggleCharacterCard } from '../store/actions/modalActions';
import { changeLevel } from '../store/actions/levelActions';
import { setCurrentQuest, updateQuestProgress } from '../store/actions/eventActions';
import { toggleCombat, } from '../store/actions/combatActions';
import { addEnemiesToCombat } from '../store/actions/enemyActions';


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
        characters: store.characters,
        event: store.event
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
        //combat
        addEnemiesToCombat: (enemies) => { dispatch(addEnemiesToCombat(enemies)) },
        //modals
        toggleDialogueState: () => { dispatch(toggleDialogueState()) },
        toggleCharacterCard: () => { dispatch(toggleCharacterCard()) },
        //level mechanics
        changeLevel: (levelName) => { dispatch(changeLevel(levelName)) },
        toggleCombat: () => { dispatch(toggleCombat()) },
        //quests
        setCurrentQuest: (name) => { dispatch(setCurrentQuest(name)) },
        updateQuestProgress: (name, progress, value) => { dispatch(updateQuestProgress(name, progress, value)) },
        // checkIfQuestTaken: (name) => { dispatch(checkIfQuestTaken(name)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverworldContainer);