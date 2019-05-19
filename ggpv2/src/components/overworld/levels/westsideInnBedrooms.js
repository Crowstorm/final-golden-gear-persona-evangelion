import React from 'react';
import _ from 'lodash';

import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_WestsideInnBedrooms } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class WestsideInnBedrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.drugged = [
            { text: "Ughhh...", char: dialogueCharacters.shujin },
            { text: "What happened?", char: dialogueCharacters.shujin },
            { text: "Looks like I'm still at the inn, I better check on the lady, I hope she's alright", char: dialogueCharacters.shujin },
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        if (this.props.modal.dialogue !== this.drugged) {
            this.props.replaceMainCharacter();
            this.props.addDialogue(this.drugged);
            this.props.toggleDialogueState();
        }
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        if (x === 21 && y === 17) {
            this.props.setCharacterPosition(21, 16);
            this.props.changeLevel('WestsideInn');
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_WestsideInnBedrooms);
    }, this.props.level.movementSpeed)



    render() {
        return (
            <div className="level westsideInnBedrooms">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default WestsideInnBedrooms;