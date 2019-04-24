import React from 'react';
import _ from 'lodash';
import * as enemies from '../../../store/enemies/enemies';

import './css/levels.css';
import '../level.css'
import DialogeContainer from '../../../containers/modals/dialogueContainer';

import { BLOCKED_CapitalCrossroads } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

import damsel from '../../../assets/sprites/npc/damsel_right.png';

class Route1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }

        this.damselInDistress = [
            { text: "Stop right there, scum!", name: "Shujin" },
            { text: "Huhu, you're approaching me?", name: "Bandit" },
            { text: "I can't beat the shit out of you without getting closer", name: "Shujin" },
            { text: "", name: "", effect: this.startBanditCombat },
        ]
        this.damselSaved = [
            { text: "Lol thanks", name: "Woman" },
            { text: "", name: "", effect: this.goToInn },
        ]
    }

    test = () => {
        console.log('test zadziałał')
        this.props.updateQuestProgress('Trouble at the Crossroads', 'enemiesDefeated', true)
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        let areEnemiesDefeated = checkQuestProgress('Trouble at the Crossroads', 'enemiesDefeated', this.props)

        console.log('mount"')
        if (this.state.dialogue !== this.damselSaved && areEnemiesDefeated) {
            this.setState({
                dialogue: this.damselSaved
            })
            this.props.toggleDialogueState();
        }

        //Usunac ja jak skonczy sie quest
        document.getElementById('d2_16').innerHTML = `<img src=${damsel} class="npcSprite" />`
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        if ((y >= 13 && y <= 18) && x === 4) {
            let areEnemiesDefeated = checkQuestProgress('Trouble at the Crossroads', 'enemiesDefeated', this.props)
            if (this.state.dialogue !== this.damselInDistress && !areEnemiesDefeated) {
                this.setState({
                    dialogue: this.damselInDistress
                })
                this.props.toggleDialogueState();
            }
        }

    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_CapitalCrossroads);
    }, this.props.level.movementSpeed)


    startBanditCombat = () => {
        const foes = [
            enemies.beholder,
            enemies.beholder,
            enemies.beholder
        ]
        this.props.toggleDialogueState()
        this.props.updateQuestRewards(10, 10, null, { effect: this.test });
        this.props.addEnemiesToCombat(foes);
        this.props.toggleCombat();
    }

    goToInn = () => {
        this.props.toggleDialogueState()
        this.props.setCharacterPosition(10, 10);
        this.props.changeLevel('WestsideInn');
    }

    render() {
        let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={this.state.dialogue} /> : '';
        return (
            <div className="level capitalCrossroads">
                {renderDialogue}
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default Route1;