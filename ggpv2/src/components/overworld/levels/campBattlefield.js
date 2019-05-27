import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_CampBattlefield } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class CampBattlefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.arrival = [
            
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        const isTheBridgeStarted = checkQuestProgress('The Bridge', 'started', this.props);
        const isFirstWaveDefeated = checkQuestProgress('The Bridge', 'firstWave', this.props);
        const isSecondWaveDefeated = checkQuestProgress('The Bridge', 'secondWave', this.props);

    }

    componentDidUpdate() {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }


    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_CampBattlefield);
    }, this.props.level.movementSpeed)



    render() {
        return (
            <div className="level campBattlefield">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default CampBattlefield;