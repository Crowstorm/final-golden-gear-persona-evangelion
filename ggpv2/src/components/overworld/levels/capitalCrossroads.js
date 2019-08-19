import React from 'react';
import _ from 'lodash';

import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';
import { capitalCrossroadsShop } from '../../../store/shops/shops';

import './css/levels.css';
import { BLOCKED_CapitalCrossroads } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class CapitalCrossroads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.troubleAtTheCrossroadsDialogue = [
            { text: "HELP!!! SOMEBODY HELP ME!!!", char: dialogueCharacters.unknown },
            { text: "Crying for help! It comes from the west, I must investigate!", char: dialogueCharacters.shujin, effect: this.addTroubleAtTheCrossroadsQuest },
        ]
        this.troubleAtTheCrossroadRoadblock = [
            { text: "No, I need to go west, someone is in danger.", char: dialogueCharacters.shujin }
        ]
        this.newAllies = [
            { text: "We're near the castle, they won't dare chase us here.", char: dialogueCharacters.shujin },
            { text: "So we have some time to talk. Why were you being attacked by them? You... don't look wealthy.", char: dialogueCharacters.setsuna },
            { text: "All my equipment got stolen while I was at the Inn. I was with this lady I saved from the bandits today's morning...", char: dialogueCharacters.shujin },
            { text: "Next thing I know is I'm upstairs, without belongings and feeling extremely weak. As I mentioned before, those bandits shouldn't stand a chance against me.", char: dialogueCharacters.shujin },
            { text: "Hmm... Let me see...", char: dialogueCharacters.setsuna },
            { text: "You are being examined by Setsuna. You can feel magic flowing through your body and roaming through your brain.", char: dialogueCharacters.unknown },
            { text: "I feel powerful surpression in your body. Not only it blocks my magic, but also limits your own organism.", char: dialogueCharacters.setsuna },
            { text: "I take you knew how to use magic, and your muscles certainly have memory of years of training. However...", char: dialogueCharacters.setsuna },
            { text: "You feel a sharp pain in your chest.", char: dialogueCharacters.unknown },
            { text: "I can only do so much... I damaged the barrier holding you down, you should be able to use basic magic and your muscles should slowly start to regenerate.", char: dialogueCharacters.setsuna },
            { text: "This should be enough to deal with bandits again, but I need to rescue the Princess, she's been missing for several days now.", char: dialogueCharacters.shujin },
            { text: "In that case I will help you, Princess is loved by the masses and my faith won't allow me to stand idle. We need more allies, though...", char: dialogueCharacters.setsuna },
            { text: "...", char: dialogueCharacters.setsuna },
            { text: "Well, I was traveling with two adventurers before one of them wandered away and the other went looking for him.", char: dialogueCharacters.setsuna },
            { text: "But I cannot vouch for their loyalty nor resolve. They are a weird bunch.", char: dialogueCharacters.setsuna },
            { text: "Anyone will do at this point. Let's find them!", char: dialogueCharacters.shujin,  effect: this.findNewAlliesUpdate },
            // { text: '', }
        ]
        this.roadBlockNewAllies = [
            { text: "Better not go there, we don't have time to deal with more bandits", char: dialogueCharacters.shujin }
        ]
        this.excuses = [
            { text: "For the purpose of the demo the next part is cut. Filler content takes just as much time to create as main content, so you are being awarded: ", char: dialogueCharacters.unknown },
            { text: "650 experiance points, 1200 gold and some equipment. After this dialogue ends check your inventory.", char: dialogueCharacters.unknown },
            { text: "Summary of what you learned:", char: dialogueCharacters.unknown },
            { text: "Adventurers are getting attacked by an unknown group, forcing them out of the capital.", char: dialogueCharacters.unknown },
            { text: "To make matters worse, one of Setsuna's companions are wanted by Military Police for desecrating the corpses and blasphemy at local cemetary. His current whereabouts are unknown", char: dialogueCharacters.unknown },
            { text: "As for the second companion, known for his good nature, went east to find out about the mysterious group working in the capital. This is your best shot at finding him.", char: dialogueCharacters.unknown },
            { text: "Before you enter a new level you will be able to talk to a 'traveling' merchant, so you can upgrade your equipment if you wish.", char: dialogueCharacters.unknown },
            { text: "Now go, and don't get spooked, I teleported him here, saving myself a lot of time from not creating a proper shop. Deadlines are the biggest threat, never forget that.", char: dialogueCharacters.unknown, effect: this.endOfExcuses  },
            // { text: '', }
        ]
    }

    findNewAlliesUpdate = () => {
        this.props.updateQuestProgress('New Allies', 'searchStart', true)
    }
    endOfExcuses = () => {
        this.props.updateQuestProgress('New Allies', 'gameCut', true)
    }

    componentDidMount = () => {
        // this.props.saveGame(2);
        document.addEventListener("keydown", this.handleKeyDown);
        let isNewAlliesQuestTaken = checkQuestProgress('New Allies', 'started', this.props);
        let isSearchStarted = checkQuestProgress('New Allies', 'searchStart', this.props);
        if (isNewAlliesQuestTaken && !isSearchStarted) {
            this.props.addDialogue(this.newAllies);
            this.props.toggleDialogueState();
        }
        this.props.loadShopInventory(capitalCrossroadsShop);
        // this.props.toggleShop();
    }

    componentDidUpdate(prevProps) {
        let { x, y } = this.props.position;
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

        const isNewAlliesQuestTaken = checkQuestProgress('New Allies', 'started', this.props);
        const isTroubleAtTheCrossroadsQuestTaken = checkIfQuestTaken('Trouble at the Crossroads', this.props);
        const isTroubleAtTheCrossroadsFinished = checkQuestProgress('Trouble at the Crossroads', 'finished', this.props);
        const isSearchStarted = checkQuestProgress('New Allies', 'searchStart', this.props);
        const isGameCut = checkQuestProgress('New Allies', 'gameCut', this.props);

        //setup shop
        if (isGameCut) {
            //place shopkeeper
            // this.props.toggleShop();
        }

        if ((y >= 13 && y <= 18) && x === 1 && !isNewAlliesQuestTaken) {
            this.props.setCharacterPosition(23, y);
            this.props.changeLevel('Route1');
        } else if ((y >= 13 && y <= 18) && x === 1 && isNewAlliesQuestTaken) {
            if (this.props.modal.dialogue !== this.roadBlockNewAllies) {
                this.props.addDialogue(this.roadBlockNewAllies);
                this.props.toggleDialogueState();
            }
        }

        //start quest
        if ((x >= 10 && x <= 16) && y === 19) {
            if (!isTroubleAtTheCrossroadsQuestTaken) {
                if (this.props.modal.dialogue !== this.troubleAtTheCrossroadsDialogue) {
                    this.props.addDialogue(this.troubleAtTheCrossroadsDialogue);
                    this.props.toggleDialogueState();
                }
            }
        }

        //roadblock during Trouble at the crossroads quest
        if (((x >= 10 && x <= 16) && y === 1) || ((y >= 13 && y <= 18) && x === 25)) {
            if (!isTroubleAtTheCrossroadsFinished) {
                if (this.props.modal.dialogue !== this.troubleAtTheCrossroadRoadblock) {
                    this.props.addDialogue(this.troubleAtTheCrossroadRoadblock);
                    this.props.toggleDialogueState();
                }
            }
        }

        //Excuses for shortening the game
        if (((x >= 10 && x <= 16) && y === 1)) {
            if (isSearchStarted) {
                if (this.props.modal.dialogue !== this.excuses) {
                    this.props.addDialogue(this.excuses);
                    this.props.toggleDialogueState();
                }
            }
        }

        //route2
        if (((y >= 13 && y <= 18) && x === 25 && isGameCut)) {
            this.props.setCharacterPosition(1, y);
            this.props.changeLevel('Route2');
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