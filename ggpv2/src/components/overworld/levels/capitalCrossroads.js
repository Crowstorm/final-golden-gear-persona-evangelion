import React from 'react';
import _ from 'lodash';

import './css/levels.css';
import { BLOCKED_CapitalCrossroads } from '../grids/blockedLevelGrids';

import {ocelot} from '../../../store/allies/allies';

import DialogeContainer from '../../../containers/modals/dialogueContainer';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class CapitalCrossroads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.troubleAtTheCrossroadsDialogue = [
            { text: "HELP!!! SOMEBODY HELP ME!!!", name: "Unknown" },
            { text: "Crying for help! It comes from the west, I must investigate!", name: "Shujin", effect: this.addTroubleAtTheCrossroadsQuest },
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
        let oldX = prevProps.position.x;
        let oldY = prevProps.position.y;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        if ((x >= 10 && x <= 16) && y === 25) {
            this.props.setCharacterPosition(13, 2);
            this.props.changeLevel('CastleFront');
        }
        if ((y >= 13 && y <= 18) && x === 1) {
            this.props.setCharacterPosition(23, y);
            this.props.changeLevel('Route1');
        }

        //start quest
        if ((x >= 10 && x <= 16) && y === 19) {
            let isTroubleAtTheCrossroadsQuestTaken = checkIfQuestTaken('Trouble at the Crossroads', this.props);
            console.log({ isTroubleAtTheCrossroadsQuestTaken })
            if (!isTroubleAtTheCrossroadsQuestTaken) {
                if (this.props.modal.dialogue !== this.troubleAtTheCrossroadsDialogue) {
                    this.props.addDialogue(this.troubleAtTheCrossroadsDialogue);
                    this.props.toggleDialogueState();
                }
            }
        }

        //roadblock during Trouble at the crossroads quest
        if (((x >= 10 && x <= 16) && y === 1) || ((y >= 13 && y <= 18) && x === 25)) {
            if (this.props.modal.dialogue !== this.troubleAtTheCrossroadRoadblock) {
                this.props.addDialogue(this.troubleAtTheCrossroadRoadblock);
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
        return (
            <div className="level capitalCrossroads">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default CapitalCrossroads;