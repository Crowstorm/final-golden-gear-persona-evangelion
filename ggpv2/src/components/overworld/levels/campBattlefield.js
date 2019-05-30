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
            { text: "Deth, keep him alive at any cost! I will help him once we're done here!", char: dialogueCharacters.setsuna },
        ]

        this.afterSecondWave = [
            { text: "That's all of them... Damn, that was exhausting...", char: dialogueCharacters.shujin },
            { text: "*panting* I still... Can't believe... He did that... He promised...", char: dialogueCharacters.setsuna },
            { text: "Will to live is stronger than any promise, priestess. You of all people should know it.", char: dialogueCharacters.deth },
            { text: "Besides, I didn't rise him from the dead. I simply healed his wounds.", char: dialogueCharacters.deth },
            { text: "With forbidden magic, you... You...", char: dialogueCharacters.setsuna },
            { text: "Weeeee, hahagagagag!", char: dialogueCharacters.tonoruk },
            { text: "Contrary to you, he seems to be happy.", char: dialogueCharacters.deth },
            //Wjebać efekt i przeniesc z battlefielda
        ]

        this.secondWave1 = [
            { text: "Hey, wake up, big boy!", char: dialogueCharacters.deth },
            { text: "...", char: dialogueCharacters.deth },
            { text: "Big boy?", char: dialogueCharacters.deth },
            { text: "Out of my way, traitors of the Crown!", char: dialogueCharacters.shujin }
        ]

        this.secondWave2 = [
            { text: "You leave me no choice, old friend...", char: dialogueCharacters.deth },
            { text: "D... D-d-don't...", char: dialogueCharacters.tonoruk },
            { text: "Just a little longer!!!", char: dialogueCharacters.setsuna },
        ]

        this.secondWave3 = [
            { text: "What is that sound?!", char: dialogueCharacters.shujin },
            { text: "By the gods, Deth, stop!!!", char: dialogueCharacters.setsuna },
            { text: "I'm not dying here with him, dear!", char: dialogueCharacters.deth },
        ]

        this.secondWave4 = [
            { text: "Stop looking, just kill him before he finishes his spell!!!", char: dialogueCharacters.militaryRegular },
            { text: "What the fuck's that smell?!", char: dialogueCharacters.bandit },
            { text: "Stop, I can still feel his lifeforce!", char: dialogueCharacters.setsuna },
            { text: "There isn't any force left in this bag of bones, I'm about to give him one!", char: dialogueCharacters.deth },
            { text: "RISE, OLD FRIEND!!! SHOW THEM WHAT REAL HEALING IS!!!", char: dialogueCharacters.deth },
        ]
    }

    fightFirstWave = () => {
        const foes = [
            enemies.bandit,
            enemies.bandit,
            enemies.militaryPolice,
            // enemies.bandit,
            // enemies.bandit,
        ]

        this.props.updateCombatRewards(0, 0, null, { effect: this.firstWaveDefeated });
        this.props.addEnemiesToCombat(foes);
        this.props.toggleCombat();
    }

    fightSecondWave = () => {
        const foes = [
            enemies.militaryPolice,
            enemies.bandit,
            enemies.bandit,
            enemies.bandit,
            enemies.bandit,
            // enemies.bandit,
            // enemies.bandit,
            // enemies.bandit,
            // enemies.bandit,
        ]

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
        const condition4 = {
            type: 'turn',
            turn: 4
        }


        this.props.addCombatTriggers({ effect: this.secondWaveTrigger1, condition: condition1 })
        this.props.addCombatTriggers({ effect: this.secondWaveTrigger2, condition: condition2 })
        this.props.addCombatTriggers({ effect: this.secondWaveTrigger3, condition: condition3 })
        this.props.addCombatTriggers({ effect: this.secondWaveTrigger3, condition: condition4 })

        //dodac jakies fajne nagrody bo zaraz boss fight
        this.props.updateCombatRewards(100, 100, null, { effect: this.secondWaveDefeated });
        this.props.addEnemiesToCombat(foes);
        this.props.toggleCombat();
    }

    secondWaveDefeated = () => {
        console.log('gz');
        this.props.updateQuestProgress('The Bridge', 'secondWave', true)
    }
    firstWaveDefeated = () => {
        console.log('gz');
        this.props.updateQuestProgress('The Bridge', 'firstWave', true)
    }

    secondWaveTrigger1 = () => {
        this.props.addDialogue(this.secondWave1);
        this.props.toggleDialogueState();
    }
    secondWaveTrigger2 = () => {
        this.props.addDialogue(this.secondWave2);
        this.props.toggleDialogueState();
    }
    secondWaveTrigger3 = () => {
        this.props.addDialogue(this.secondWave3);
        this.props.toggleDialogueState();
    }
    secondWaveTrigger4 = () => {
        this.props.addDialogue(this.secondWave4);
        this.props.toggleDialogueState();
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        const isTheBridgeStarted = checkQuestProgress('The Bridge', 'started', this.props);
        const isFirstWaveDefeated = checkQuestProgress('The Bridge', 'firstWave', this.props);
        const isSecondWaveDefeated = checkQuestProgress('The Bridge', 'secondWave', this.props);
        // const isBattleWon = checkQuestProgress('The Bridge', 'battleWon', this.props);

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

        if(isFirstWaveDefeated && isSecondWaveDefeated){
            this.props.addDialogue(this.afterSecondWave);
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

        const isFirstWaveDefeated = checkQuestProgress('The Bridge', 'firstWave', this.props);
        const isSecondWaveDefeated = checkQuestProgress('The Bridge', 'secondWave', this.props);
        if (x === 12 && y === 15) {
            if (!isFirstWaveDefeated) {
                this.fightFirstWave();
            }
        }

        if (x === 15 && y === 15) {
            if (!isSecondWaveDefeated) {
                this.fightSecondWave();
            }
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