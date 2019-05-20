import React from 'react';
import _ from 'lodash';

import * as consumables from '../../../store/items/items';
import * as enemies from '../../../store/enemies/enemies';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_AbandonedBuildingInside } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress, isChestCleared } from '../levelFunctions/levelFunctions';

class AbandonedBuildingInside extends React.Component {
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

        if (x === 17 && y === 9) {
            this.props.setCharacterPosition(16, 9);
            this.props.changeLevel('AbandonedBuilding');
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_AbandonedBuildingInside);
        if (e.key === "Enter" && (x === 16 && y === 14 || x === 15 && y === 15)) {
            const chestName = 'abandonedBuildingInside_1';
            const isChestFound = isChestCleared(chestName, this.props);
            if (!isChestFound) {
                this.props.addItemOrAbility('consumables', consumables.minorHealingPotion)
                this.props.addItemOrAbility('consumables', consumables.minorManaPotion);

                this.props.chestCleared(chestName);

                const info = [
                    { text: `You picked up ${consumables.minorHealingPotion.name} and ${consumables.minorManaPotion.name}`, char: dialogueCharacters.unknown },
                ]
                this.props.addDialogue(info);
                this.props.toggleDialogueState();
            }
        }

    }, this.props.level.movementSpeed)



    render() {
        return (
            <div className="level abandonedBuildingInside">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default AbandonedBuildingInside;