import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';
import * as consumables from '../../../store/items/items';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_CapitalForest } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress, rollForRandomCombat, isChestCleared } from '../levelFunctions/levelFunctions';

class CapitalForest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate(prevProps) {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }
        
        //random encounters
        if (prevProps.x != x || prevProps.y != y) {
            const isRandomEncounter = rollForRandomCombat();
            if (isRandomEncounter) {
                const roll1 = Math.floor((Math.random() * 2) + 1);
                const roll2 = Math.floor((Math.random() * 3) + 1);
                let foes = []
                for (let i = 0; i < roll1; i++) {
                    foes.push(enemies.boar);
                }
                for (let i = 0; i < roll2; i++) {
                    foes.push(enemies.wolf);
                }
                this.props.addEnemiesToCombat(foes);
                this.props.toggleCombat();
            }
        }

        //Battlefield
        if (x === 25 && (y >= 2 && y <= 4)) {
            this.props.setCurrentQuest('theBridge')
            this.props.setCharacterPosition(1, y);
            this.props.changeLevel('CampBattlefield')
        }

        //AbandonedBuilding
        if(x ===1 && (y >=22 && y <= 24)){
            this.props.setCharacterPosition(24, y);
            this.props.changeLevel('AbandonedBuilding')
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_CapitalForest);

        //CHEST
        if (e.key === "Enter" && (x === 1 && y === 5)) {
            const chestName = 'CapitalForest_1';
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
            <div className="level capitalForest">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default CapitalForest;