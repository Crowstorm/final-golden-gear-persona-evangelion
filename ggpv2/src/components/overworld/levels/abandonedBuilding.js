import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_AbandonedBuilding } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class AbandonedBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        //Route2
        if (x === 1 && (y >= 7 && y <= 10)) {
            this.props.setCharacterPosition(25, y);
            this.props.changeLevel('Route2');
        }
        //Inside
        if (x === 16 && y === 11) {
            this.props.setCharacterPosition(17, 10);
            this.props.changeLevel('AbandonedBuildingInside');
        }

        //xxxx
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_AbandonedBuilding);
        //Inside
        if (x === 16 && y === 10 && e.key === "Enter") {
            this.props.setCharacterPosition(17, 10);
            this.props.changeLevel('AbandonedBuildingInside');
        }
    }, this.props.level.movementSpeed)



    render() {
        return (
            <div className="level abandonedBuilding">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default AbandonedBuilding;