import React from 'react';
import _ from 'lodash';

import * as consumables from '../../../store/items/items';
import * as enemies from '../../../store/enemies/enemies';
import * as armor from '../../../store/items/armor';
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
        this.conspiracy = [
            { text: "For a bunch of scums that want to be taken as dangerous lot you're not doing a very good job! There are still noisy adventurers in the area.", char: dialogueCharacters.militaryRegular },
            { text: "Piss off, shiny pants. Without us you wouldn't accomplish shite. All you do is sit around inside the walls and leave the dirty job to us.", char: dialogueCharacters.bandit },
            { text: "And you don't even pay that good!", char: dialogueCharacters.bandit },
            { text: "You're payment is not being executed for 'bothering' people. Now, I want you to finish the job and find those two newcomers before they ruin everything!", char: dialogueCharacters.militaryRegular },
            { text: "Heh, sure, 'boss'. But it seems we have another pair of cunts that want to have their throats cut.", char: dialogueCharacters.bandit },
            { text: "HOW DARE YOU EAVESDROP ON THE MILITARY'S MATTER! DIE!", char: dialogueCharacters.militaryRegular },
            { text: "Oh dear...", char: dialogueCharacters.setsuna },
            { text: '', effect: this.startMilitaryCombat }
        ]
    }

    updateNewAllies = () =>{
        this.props.updateQuestProgress('New Allies', 'abandonedBuildingCleared', true)
    }

    startMilitaryCombat = () => {
        const foes = [
            enemies.bandit2,
            enemies.bandit2,
            enemies.militaryPolice,
            enemies.bandit2
        ]

        this.props.toggleDialogueState()
        this.props.updateCombatRewards(50, 50, armor.steelLegs, { effect: this.updateNewAllies });
        this.props.addEnemiesToCombat(foes);
        this.props.toggleCombat();
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);

        let isAbandonedBuildingCleared = checkQuestProgress('New Allies', 'abandonedBuildingCleared', this.props);
        if (!isAbandonedBuildingCleared) {
            document.getElementById('d16_13').innerHTML = `<img src=${enemies.bandit.right} class="npcSprite"/>`
            document.getElementById('d16_14').innerHTML = `<img src=${enemies.bandit.front} class="npcSprite"/>`
            document.getElementById('d17_14').innerHTML = `<img src=${enemies.bandit.front} class="npcSprite"/>`
            document.getElementById('d17_13').innerHTML = `<img src=${enemies.militaryPolice.left} class="npcSprite"/>`
            this.props.addDialogue(this.conspiracy);
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