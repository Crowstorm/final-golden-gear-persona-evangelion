import React from 'react';
import _ from 'lodash';

import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_ThroneRoom } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken } from '../levelFunctions/levelFunctions';

import king from '../../../assets/sprites/npc/king_overworld.png';


class ThroneRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.kingDialogue = [
            { text: "Thank you for coming. As you already heard, the princess had been kidnapped.", char: dialogueCharacters.king },
            { text: "And in this time of need we know that we can count on you.", char: dialogueCharacters.king, effect: this.addSaveThePrincessQuest },
            { text: "We've already sent our best men, but the truth is anyone could be involved in her disappearance.", char: dialogueCharacters.king },
            { text: "It is to our understanding that you care deeply for our daughter. If you save her you shall be offered her hand.", char: dialogueCharacters.king },
            { text: "Essentialy making you the Prince of the Realm.", char: dialogueCharacters.king },
            { text: "She was last seen on the streets near the Inn. That's not the first time something bad happened there. During the night bandits are patrolling this area.", char: dialogueCharacters.king },
            { text: "Now go, my friend, and save the Princess. Time might be running short.", char: dialogueCharacters.king }
        ];
        this.noPrincessQuestDialogue = [
            { text: "I can't leave yet, King has an important matter to discuss", char: dialogueCharacters.shujin }
        ]

        this.tutorial = [
            {text: "In order to interact with objects or people you need to get near them and press 'Enter'.", char: dialogueCharacters.unknown}
        ]
    }


    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        document.getElementById('d12_17').innerHTML = `<img src=${king} />`
        // this.setState({
        //     dialogue: this.kingDialogue
        // })
        this.props.addDialogue(this.tutorial)
        this.props.toggleDialogueState();
    }

    componentDidUpdate(prevProps) {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        if ((x >= 12 && x <= 14) && y === 2) {
            let isSaveThePrincessQuestTaken = checkIfQuestTaken('Save the Princess', this.props);
            if (isSaveThePrincessQuestTaken) {
                this.props.setCharacterPosition(x, 23);
                this.props.changeLevel('CastleCorridor');
            } else {
                if (this.props.modal.dialogue !== this.noPrincessQuestDialogue) {
                    this.props.addDialogue(this.noPrincessQuestDialogue)
                    this.props.toggleDialogueState();
                }
            }
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_ThroneRoom);
        //near King
        if (e.key === "Enter" && ((x === 11 && y === 16) || (x === 12 && y === 16))) {
            this.props.addDialogue(this.kingDialogue)
            this.props.toggleDialogueState();
        }
    }, this.props.level.movementSpeed)

    addSaveThePrincessQuest = () => {
        this.props.setCurrentQuest('saveThePrincess')
    }

    render() {
        return (
            <div className="level throneRoom">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default ThroneRoom;