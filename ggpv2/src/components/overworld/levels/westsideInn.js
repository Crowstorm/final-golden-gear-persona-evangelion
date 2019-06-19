import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';
import * as allies from '../../../store/allies/allies';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_WestsideInn } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

import damsel from '../../../assets/sprites/npc/damsel_down.png';


class WestsideInn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.damselSaved = [
            { text: "Thank you again for saving me from the bandits.", char: dialogueCharacters.damselInDistress },
            { text: "If it wasn't for you I don't know what would have happened.", char: dialogueCharacters.damselInDistress },
            { text: "No need to thank me, my lady. It is an honor to serve the citizens of the realm.", char: dialogueCharacters.shujin },
            { text: "Still, I need to repay you for your bravery.", char: dialogueCharacters.damselInDistress },
            { text: "I rent a room upstairs and we could...", char: dialogueCharacters.damselInDistress },
            { text: "I respectfully decline, my lady.", char: dialogueCharacters.shujin },
            { text: "Then at least allow me to offer you a drink.", char: dialogueCharacters.damselInDistress },
            { text: "Very well!", char: dialogueCharacters.shujin },
            { text: "", effect: this.mysteriousDrink },
        ]

        this.banditsAttack = [
            { text: "Your journey ends here, 'Hero of the Realm'!", char: dialogueCharacters.banditLeader },
            { text: "Do you lowlifes never learn?", char: dialogueCharacters.shujin },
            { text: "Heh, come and find out!", char: dialogueCharacters.banditLeader },
            { text: "", effect: this.startBanditsCombat},
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        const isMainCharDrugged = checkQuestProgress('Trouble at the Crossroads', 'drugged', this.props);
        const isTroubleAtTheCrossroadsFinished = checkQuestProgress('Trouble at the Crossroads', 'finished', this.props);

        if (!isMainCharDrugged) {
            document.getElementById('d11_11').innerHTML = `<img src=${damsel} class="npcSprite" style="transform: translateY(-20px)"/>`
        }


        const areEnemiesDefeated = checkQuestProgress('Trouble at the Crossroads', 'enemiesDefeated', this.props);
        if (this.props.modal.dialogue !== this.damselSaved && areEnemiesDefeated && !isMainCharDrugged) {
            this.props.addDialogue(this.damselSaved);
            this.props.toggleDialogueState();
        }

     
        //spawn enemies after drugging
        if (isMainCharDrugged && !isTroubleAtTheCrossroadsFinished) {
            document.getElementById('d11_8').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite"/>`
            document.getElementById('d12_8').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite"/>`
            document.getElementById('d13_8').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite"/>`
            document.getElementById('d14_8').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite"/>`
            document.getElementById('d15_8').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite"/>`
            //setsuna
            // document.getElementById('d13_7').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite"/>`
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

        let isMainCharDrugged = checkQuestProgress('Trouble at the Crossroads', 'drugged', this.props);
        let isTroubleAtTheCrossroadsFinished = checkQuestProgress('Trouble at the Crossroads', 'finished', this.props);
        if ((x >= 10 && x <= 16) && (y >= 7 && y <= 9) && isMainCharDrugged && !isTroubleAtTheCrossroadsFinished) {
            if (this.props.modal.dialogue !== this.banditsAttack && isMainCharDrugged && !isTroubleAtTheCrossroadsFinished) {
                this.props.addDialogue(this.banditsAttack);
                this.props.toggleDialogueState();
            }
        }
        if (x === 21 && y === 17) {
            this.props.setCharacterPosition(21, 16);
            this.props.changeLevel('WestsideInnBedrooms');
        }
    }

    weak = () => {
        const dialogue = [
            { text: "I feel... Different.", char: dialogueCharacters.shujin },
            { text: "And the sword seems to be heavier...", char: dialogueCharacters.shujin },
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }

    setsunaJoinTheParty = () => {
        this.props.addNewAlly(allies.setsuna)
    }
    healMainCharacter = () => {
        this.props.charRestore('hp', 100, 0);
    }
    deathIsNear = () => {
        const dialogue = [
            { text: "...Damn... At this rate... I'll die... Princess...", char: dialogueCharacters.shujin },
            { text: "I've heard a noise, what's go...", char: dialogueCharacters.setsuna },
            { text: "Piss off, lass, this doesn't concern you!", char: dialogueCharacters.banditLeader },
            { text: "Listen to them... Run!", char: dialogueCharacters.shujin },
            { text: "I won't leave someone in an uneven fight. Allow me to help. My name is Setsuna and I will offer you the power of the Blessings.", char: dialogueCharacters.setsuna },
            { text: "MAY THE GODS BLUH BLUH BLUH, HEALING!!!!!!!!!", char: dialogueCharacters.setsuna, effect: this.healMainCharacter },
            { text: "Thank you! Now, let's finish this!", char: dialogueCharacters.shujin, effect: this.setsunaJoinTheParty },
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }

    leaveTheInn = () => {
        this.props.changeLevel('CapitalCrossroads');
        this.props.toggleDialogueState();
    }
    banditsDefeated = () => {
        this.props.setCharacterPosition(13, 8);
        this.props.updateQuestProgress('Trouble at the Crossroads', 'finished', true)
        this.props.setCurrentQuest('newAllies');
        const dialogue = [
            { text: "I would've died here without your help, thank you.", char: dialogueCharacters.shujin },
            { text: "It's destiny you should be thanking. If it wasn't for it's design we wouldn't be talking right now.", char: dialogueCharacters.setsuna },
            { text: "Just few hours ago it would never happen. At my full power I wouldn't even break a sweat at dispatching these worms, but now... Something's wrong with me.", char: dialogueCharacters.shujin },
            { text: "We can talk about it elsewhere, let's leave before more bandits gather around here.", char: dialogueCharacters.setsuna },
            { text: "", effect: this.leaveTheInn },
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }

    startBanditsCombat = () => {
        const foes = [
            enemies.bandit,
            enemies.bandit,
            enemies.bandit,
            enemies.bandit,
            enemies.bandit,
            enemies.banditLeader,
        ]
        const condition1 = {
            type: 'turn',
            turn: 0
        }
        const condition2 = {
            type: 'hp',
            percentage: 0.5,
            name: 'BigBoss'
        }

        this.props.addCombatTriggers({ effect: this.weak, condition: condition1 })
        this.props.addCombatTriggers({ effect: this.deathIsNear, condition: condition2 })
        this.props.addEnemiesToCombat(foes);
        this.props.updateCombatRewards(10, 10, null, { effect: this.banditsDefeated });
        this.props.toggleCombat();
    }



    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_WestsideInn);
    }, this.props.level.movementSpeed)

    mysteriousDrink = () => {
        this.props.updateQuestProgress('Trouble at the Crossroads', 'drugged', true)
        this.props.toggleDialogueState()
        this.props.setCharacterPosition(6, 16);
        this.props.changeLevel('WestsideInnBedrooms');
    }


    render() {
        // let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={this.state.dialogue} /> : '';
        return (
            <div className="level westsideInn">
                {/* {renderDialogue} */}
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default WestsideInn;