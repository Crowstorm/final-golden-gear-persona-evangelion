import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';

import './css/levels.css';
import DialogeContainer from '../../../containers/modals/dialogueContainer';

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
            { text: "Thank you again for saving me from the bandits.", name: "Woman" },
            { text: "If it wasn't for you I don't know what would have happened.", name: "Woman" },
            { text: "No need to thank me, my lady. It is an honor to serve the citizens of the realm.", name: "Shujin" },
            { text: "Still, I need to repay you for your bravery.", name: "Woman" },
            { text: "I rent a room upstairs and we could...", name: "Woman" },
            { text: "I respectfully decline, my lady.", name: "Shujin" },
            { text: "Then at least allow me to offer you a drink.", name: "Woman" },
            { text: "Very well!", name: "Shujin" },
            { text: "", name: "", effect: this.mysteriousDrink },
        ]

        this.banditsAttack = [
            { text: "Your journey ends here, 'Hero of the Realm'!", name: "Bandit" },
            { text: "Do you lowlifes never learn?", name: "Shujin" },
            { text: "Heh, come and find out!", name: "Bandit" },
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        let isMainCharDrugged = checkQuestProgress('Trouble at the Crossroads', 'drugged', this.props);

        if (!isMainCharDrugged) {
            document.getElementById('d11_11').innerHTML = `<img src=${damsel} class="npcSprite" style="transform: translateY(-20px)"/>`
        }


        let areEnemiesDefeated = checkQuestProgress('Trouble at the Crossroads', 'enemiesDefeated', this.props);
        if (this.state.dialogue !== this.damselSaved && areEnemiesDefeated && !isMainCharDrugged) {
            this.setState({
                dialogue: this.damselSaved
            })
            this.props.addDialogue(this.damselSaved);
            this.props.toggleDialogueState();
        }

        if (this.state.dialogue !== this.banditsAttack && isMainCharDrugged) {
            this.setState({
                dialogue: this.banditsAttack
            })
            this.props.addDialogue(this.banditsAttack);
            this.props.toggleDialogueState();
        }
    }

    test = () => {
        console.log('elo');
        const dialogue = [
            { text: "Thank you again for saving me from the bandits.", name: "Woman" },
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }


    startBanditsCombat = () => {
        const foes = [
            enemies.beholder,
            enemies.beholder,
            enemies.beholder
        ]
        const condition = {
            type: 'hp',
            percentage: 0.5,
            name: 'BigBoss'
        }

        this.props.addCombatTriggers({ effect: this.test, condition })
        this.props.addEnemiesToCombat(foes);
        // this.props.updateQuestRewards(10, 10, null, { effect: this.updateTroubleAtTheCrossroads });
        this.props.toggleCombat();
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
        if ((x >= 10 && x <= 16) && (y >= 7 && y <= 9) && isMainCharDrugged) {
            //NEW QUEST
            this.startBanditsCombat();
            //combat with extra conditions (new char after losing)
        }
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
        this.props.setCharacterPosition(12, 12);
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