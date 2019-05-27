import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_CampBattlefield } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

import tonoruk from '../../../assets/sprites/allies/tonoruk/pose.png'
import deth from '../../../assets/sprites/allies/deth/pose.png'

class CampBattlefield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.arrival = [
            { text: "By the gods...", char: dialogueCharacters.setsuna },
            { text: "We don't have time for this, just kill them already!!!", char: dialogueCharacters.militaryRegular },
            { text: "Make one more sudden move and I will rip the skeletons out of your fragile bodies!", char: dialogueCharacters.deth },
            { text: "Instead of empty promises I would really appreciate your REAL help... I'm slowly getting tired.", char: dialogueCharacters.tonoruk },
            { text: "Can't really unleash hell upon them when you are standing in my way, big boy.", char: dialogueCharacters.deth },
            { text: "Attack from both sides, stop dying one by one you stupid cunts!!!", char: dialogueCharacters.bandit },
            { text: "We have to help them, they're getting overwhelmed!", char: dialogueCharacters.shujin },
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        const isTheBridgeStarted = checkQuestProgress('The Bridge', 'started', this.props);
        const isFirstWaveDefeated = checkQuestProgress('The Bridge', 'firstWave', this.props);
        const isSecondWaveDefeated = checkQuestProgress('The Bridge', 'secondWave', this.props);
        const isBattleWon = checkQuestProgress('The Bridge', 'battleWon', this.props);

        document.getElementById('d23_19').innerHTML = `<img src=${tonoruk} class="npcSprite" style="transform: translateY(-20px)"/>`
        document.getElementById('d23_21').innerHTML = `<img src=${deth} class="npcSprite" style="transform: translateY(-20px)"/>`

        if(!isSecondWaveDefeated && !isFirstWaveDefeated){
            // document.getElementById('d21_21').innerHTML = `<img src=${enemies.bandit.right} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d22_18').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d24_18').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d23_18').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d21_17').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d22_17').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d23_17').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d24_17').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
        } else if (!isSecondWaveDefeated && isFirstWaveDefeated){
            document.getElementById('d21_21').innerHTML = `<img src=${enemies.bandit.right} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d22_18').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d23_18').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d24_18').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d22_17').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d23_17').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`

            document.getElementById('d16_15').innerHTML = `<img src=${enemies.militaryPolice.left} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d16_16').innerHTML = `<img src=${enemies.bandit.left} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d16_14').innerHTML = `<img src=${enemies.bandit.left} class="npcSprite" style="transform: translateY(-20px)"/>`
        }

        if(!isFirstWaveDefeated){
            document.getElementById('d13_15').innerHTML = `<img src=${enemies.bandit.left} class="npcSprite" style="transform: translateY(-20px)"/>`
        }


        if (isTheBridgeStarted && !isFirstWaveDefeated) {
            this.props.addDialogue(this.arrival);
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