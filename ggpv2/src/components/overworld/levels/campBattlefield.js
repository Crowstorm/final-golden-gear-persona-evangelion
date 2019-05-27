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

        this.afterFirstWave = [
            { text: "AAARGGGHHHH!!!", char: dialogueCharacters.tonoruk },
            { text: "Tonoruk! Hold on, we're coming!", char: dialogueCharacters.setsuna },
            { text: "Don't let those two come any closer, destroy the bridge!", char: dialogueCharacters.militaryRegular },
            { text: "Hey, big boy, don't give up on me! Ah, shit! Die, you reeking meatsack!", char: dialogueCharacters.deth },
            { text: "AAAAAAAAAAAAAAAAAHHHHHHHHHH!!!", char: dialogueCharacters.bandit },
            { text: "Setsuna, quickly! They are about to destroy the bridge!", char: dialogueCharacters.shujin },
            { text: "Deth, keep him alive at any cost! I will help him once we're done him!", char: dialogueCharacters.setsuna },
        ]
    }

    secondWave1 = () =>{
        const dialogue = [
            {text: "Hey, wake up, big boy!", char: dialogueCharacters.deth},
            {text: "...", char: dialogueCharacters.deth},
            {text: "Big boy?", char: dialogueCharacters.deth},
            {text: "Out of my way, traitors of the Crown!", char: dialogueCharacters.shujin}
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }
    secondWave2 = () =>{
        const dialogue = [
            {text: "You leave me no choice, old friend... I won't let us both die here.", char: dialogueCharacters.deth},
            {text: "D-d-d-don't...", char: dialogueCharacters.tonoruk},
            {text: "Deth, what are you trying to do?!", char: dialogueCharacters.setsuna},
            {text: "The right thing. It's always the right thing.", char: dialogueCharacters.deth},
         
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }
    secondWave3 = () =>{
        const dialogue = [
            {text: "What was that sound?!", char: dialogueCharacters.shujin},
            {text: "Deth, stop! I can still feel his life force!", char: dialogueCharacters.setsuna},
            {text: "And I can feel the axe cutting the air right next to my head.", char: dialogueCharacters.deth},
            {text: "Damn defiler...", char: dialogueCharacters.setsuna},
        ]
        this.props.addDialogue(dialogue);
        this.props.toggleDialogueState();
    }

    fightSecondWave = () =>{
        const condition1 = {
            type: 'turn',
            turn: 0
        }
        const condition2 = {
            type: 'turn',
            turn: 1
        }
        const condition3 = {
            type: 'turn',
            turn: 3
        }
      

        this.props.addCombatTriggers({ effect: this.secondWave1, condition: condition1 })
        this.props.addCombatTriggers({ effect: this.secondWave2, condition: condition2 })
        this.props.addCombatTriggers({ effect: this.secondWave3, condition: condition3 })
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        const isTheBridgeStarted = checkQuestProgress('The Bridge', 'started', this.props);
        const isFirstWaveDefeated = checkQuestProgress('The Bridge', 'firstWave', this.props);
        const isSecondWaveDefeated = checkQuestProgress('The Bridge', 'secondWave', this.props);
        const isBattleWon = checkQuestProgress('The Bridge', 'battleWon', this.props);

        document.getElementById('d23_19').innerHTML = `<img src=${tonoruk} class="npcSprite" style="transform: translateY(-20px)"/>`
        document.getElementById('d23_21').innerHTML = `<img src=${deth} class="npcSprite" style="transform: translateY(-20px)"/>`

        if (!isSecondWaveDefeated && !isFirstWaveDefeated) {
            // document.getElementById('d21_21').innerHTML = `<img src=${enemies.bandit.right} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d22_18').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d24_18').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d23_18').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d21_17').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d22_17').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d23_17').innerHTML = `<img src=${enemies.bandit.back} class="npcSprite" style="transform: translateY(-20px)"/>`
            document.getElementById('d24_17').innerHTML = `<img src=${enemies.militaryPolice.back} class="npcSprite" style="transform: translateY(-20px)"/>`
        } else if (!isSecondWaveDefeated && isFirstWaveDefeated) {
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

        if (!isFirstWaveDefeated) {
            document.getElementById('d13_15').innerHTML = `<img src=${enemies.bandit.left} class="npcSprite" style="transform: translateY(-20px)"/>`
        }


        if (isTheBridgeStarted && !isFirstWaveDefeated) {
            this.props.addDialogue(this.arrival);
            this.props.toggleDialogueState();
        }
        if (isFirstWaveDefeated && !isSecondWaveDefeated) {
            this.props.addDialogue(this.afterFirstWave);
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