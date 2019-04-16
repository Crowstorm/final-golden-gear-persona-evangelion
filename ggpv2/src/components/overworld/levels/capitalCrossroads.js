import React from 'react';
import _ from 'lodash';

import './css/levels.css';
import { BLOCKED_CapitalCrossroads } from '../grids/blockedLevelGrids';

import DialogeContainer from '../../../containers/modals/dialogueContainer';

import { characterMovement, characterPosition, checkIfQuestTaken } from '../levelFunctions/levelFunctions';

class CapitalCrossroads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.troubleAtTheCrossroadsDialogue = [
            { text: "HELP!!! SOMEBODY HELP ME!!!", name: "Unknown" },
            { text: "Crying for help! It comes from the west, I must investigate!", name: "Shujin", effect: this.addTroubleAtTheCrossroadsQuest }
        ]
        this.troubleAtTheCrossroadRoadblock = [
            { text: "No, I need to go west, someone is in danger", name: "Shujin" }
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate(prevProps) {
        let { x, y } = this.props.position;
        let {oldX, oldY} = prevProps.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
            if (this.state.dialogue && (oldX !== x || oldY !== y)) {
                this.setState({
                    dialogue: null
                })
            }
        }

        if ((x >= 10 && x <= 16) && y === 25) {
            this.props.setCharacterPosition(13, 2);
            this.props.changeLevel('CastleFront');
        }

        //start quest
        if ((x >= 10 && x <= 16) && y === 19) {
            let isTroubleAtTheCrossroadsQuestTaken = checkIfQuestTaken('Trouble at the Crossroads', this.props);
            if (!isTroubleAtTheCrossroadsQuestTaken) {
                if (this.state.dialogue !== this.troubleAtTheCrossroadsDialogue) {
                    this.setState({
                        dialogue: this.troubleAtTheCrossroadsDialogue
                    })
                    this.props.toggleDialogueState();
                }
            }
        }

        //roadblock during Trouble at the crossroads quest
        if (((x >= 10 && x <= 16) && y === 1) || ((y >= 13 && y <= 18) && x === 25)) {
            if (this.state.dialogue !== this.troubleAtTheCrossroadRoadblock) {
                this.setState({
                    dialogue: this.troubleAtTheCrossroadRoadblock
                })
                this.props.toggleDialogueState();
            }
        }


    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_CapitalCrossroads);
    }, this.props.level.movementSpeed)

    addTroubleAtTheCrossroadsQuest = () => {
        this.props.setCurrentQuest('troubleAtTheCrossroads')
    }



    render() {
        let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={this.state.dialogue} /> : '';
        return (
            <div className="level capitalCrossroads">
                {renderDialogue}
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default CapitalCrossroads;