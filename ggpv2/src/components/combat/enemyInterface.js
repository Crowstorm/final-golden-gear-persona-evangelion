import React from 'react';
import _ from 'lodash';

import * as skills from '../../store/skills/skills'
import { Bar } from './bar';
import './combat.css';

class EnemyInterface extends React.Component {

    getAllyAgility = () => {
        let i = this.props.combat.attackerIndex;
        let char = this.props.ally[i];
        let agility = 0;

        if (char && char.stats && char.stats.agility) {
            agility += char.stats.agility;
        } else {
            console.error('Couldnt get ally agility');
        }

        return agility;
    };

    getEnemyEvasion = (i) => {
        let enemy = this.props.enemy[i];
        let evasion = 0;
        if (enemy && enemy.stats && enemy.stats.agility) {
            evasion += enemy.stats.agility;
        } else {
            console.error('Couldnt get enemy agility')
        }

        return evasion;
    }

    calculateAttackSuccessChance = (agility, evasion, abilityHitChance) => {
        let roll = Math.floor((Math.random() * 100) + 1);

        if (!abilityHitChance) {
            let basicHitChance = this.props.combat.basicAllyHitChance;
            let finalHitChance = basicHitChance + agility * 1.5 - evasion;
            if (finalHitChance >= roll) {
                return true;
            }
            return false;
        } else {
            let chance = abilityHitChance + agility / 5;
            if (chance >= roll) {
                return true;
            }
            return false;
        }
    }

    wasAttackCritical = () => {
        let i = this.props.combat.attackerIndex;
        let roll = Math.floor((Math.random() * 100) + 1);
        let char = this.props.ally[i];
        let wasCritical = false;
        if (char && char.stats && char.stats.luck) {
            let luck = char.stats.luck;
            if (luck >= roll) {
                wasCritical = true;
                return wasCritical;
            } else {
                return wasCritical;
            }
        } else {
            console.error('Couldnt get ally luck');
            return wasCritical;
        }
    }

    calculateAllyDmg = (_multiplier) => {
        let i = this.props.combat.attackerIndex;
        let char = this.props.ally[i];
        let attack = 0;
        let multiplier = (_multiplier) ? _multiplier : 1;

        if (char && char.stats && char.stats.strength) {
            attack += char.stats.strength;
        } else {
            console.error('Couldnt get ally attack');
        }

        attack *= multiplier;

        return attack;
    }

    getEnemyDefence = (i) => {
        let enemy = this.props.enemy[i];
        let defence = 0;
        if (enemy && enemy.stats && enemy.stats.defence) {
            defence += enemy.stats.defence;
        } else {
            console.error('Couldnt get enemy defence')
        }

        return defence;
    }

    //Returns random number between max and min weapon damage
    getWeaponDmg = (i) => {
        return new Promise(resolve => {
            if (this.props.ally[i].weapon) {
                let minDmg = this.props.ally[i].weapon.attack[0];
                let maxDmg = this.props.ally[i].weapon.attack[1];
                let dmg = Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg;
                resolve(dmg)
            } else {
                resolve(0);
            }
        })

    }

    calculateTotalDmg = async (allyDmg, enemyDef, wasCritical, i) => {
        let criticalMultiplier = this.props.combat.basicCriticalMultiplier;
        if (!criticalMultiplier) {
            console.error('Cant get critical multiplier');
            return 0;
        }

        let totalDmg = 0;
        let weaponDmg = await this.getWeaponDmg(i);
        allyDmg += weaponDmg;

        if (!wasCritical) {
            totalDmg += allyDmg - enemyDef;
            return totalDmg;
        } else {
            totalDmg += (allyDmg * criticalMultiplier - enemyDef / 2);
            return totalDmg;
        }
    }

    // calculates damage and/or effects affecting targeted enemy
    handleEnemyAttacked = async (i) => {
        let combat = this.props.combat;
        let attI = this.props.combat.attackerIndex;
        let name = this.props.ally[attI].name;


        if (combat.attackReady && combat.whoseTurn === 'ally') {
            let enemy = this.props.enemy[i];
            let enemies = this.props.enemy;
            this.props.isAttackReady(false)
            let allyAgility = this.getAllyAgility();
            let enemyEvasion = this.getEnemyEvasion(i);

            if (combat.activeAbility.type) {
                // pay cost of ability


                //find proper ability
                let abilityName = _.findKey(skills, { name: combat.activeAbility.name });
                let ability = skills[abilityName];
                let wasAttackSuccessful = this.calculateAttackSuccessChance(allyAgility, enemyEvasion, ability.hitChance);

                if (wasAttackSuccessful) {
                    let wasCritical = this.wasAttackCritical();
                    let allyDmg = 0;
                    let enemyDef = 0;
                    let totalDmg = 0;

                    //bonusy przed jesli sa

                    if (ability.multiplier) {
                        allyDmg = this.calculateAllyDmg(ability.multiplier);
                        enemyDef = this.getEnemyDefence(i);
                        totalDmg = await this.calculateTotalDmg(allyDmg, enemyDef, wasCritical, attI);
                        this.props.enemyLoseHp(totalDmg, i);
                        let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
                        this.props.addInfoToArray(info)

                    } else if (ability.dmgType === 'flat') {

                        if (ability.aoe) {
                            let noOfEnemies = this.props.enemy.length;
                            for (let [index, enemy] of enemies.entries()) {
                                index = noOfEnemies - index - 1;
                                enemyDef = this.getEnemyDefence(index);
                                allyDmg = ability.dmg;
                                totalDmg = await this.calculateTotalDmg(allyDmg, enemyDef, wasCritical, attI);
                                this.props.enemyLoseHp(totalDmg, index);
                                let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
                                this.props.addInfoToArray(info);
                            }
                        } else {
                            enemyDef = this.getEnemyDefence(i);
                            allyDmg = ability.dmg;
                            totalDmg = await this.calculateTotalDmg(allyDmg, enemyDef, wasCritical, attI);
                            this.props.enemyLoseHp(totalDmg, i);
                            let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
                            this.props.addInfoToArray(info)
                        }

                    } else if (ability.dmgType === 'perc') {
                        if (ability.aoe) {
                            let noOfEnemies = this.props.enemy.length;
                            for (let [index, ene] of enemies.entries()) {
                                index = noOfEnemies - index - 1;
                                let enemyHp = ene.stats.hp;
                                totalDmg = enemyHp / ability.dmg;
                                this.props.enemyLoseHp(totalDmg, index);
                                let info = `${name} dealt ${totalDmg} damage to ${ene.name}`;
                                this.props.addInfoToArray(info)
                            }
                        } else {
                            let enemyHp = enemy.stats.hp;
                            totalDmg = enemyHp / ability.dmg;
                            this.props.enemyLoseHp(totalDmg, i);
                            let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
                            this.props.addInfoToArray(info)
                        }

                    } else {
                        alert('new skill type?')
                    }

                    this.props.nextAllyTurn();
                    //deactivate ability
                    this.props.resetActiveAbility();
                } else {
                    let info = `${name} missed!`;
                    this.props.addInfoToArray(info)
                    this.props.nextAllyTurn();
                }


                //jesli flat dmg pobranie danych i atak
            } else {
                let wasAttackSuccessful = this.calculateAttackSuccessChance(allyAgility, enemyEvasion);


                if (wasAttackSuccessful) {
                    let wasCritical = this.wasAttackCritical();
                    let allyDmg = this.calculateAllyDmg();
                    let enemyDef = this.getEnemyDefence(i);
                    let totalDmg = await this.calculateTotalDmg(allyDmg, enemyDef, wasCritical, attI);
                    this.props.enemyLoseHp(totalDmg, i);
                    let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
                    this.props.addInfoToArray(info)
                    this.props.nextAllyTurn();
                } else {
                    let info = `${name} missed!`;
                    this.props.addInfoToArray(info)
                    this.props.nextAllyTurn();
                }
            }


        }
    }

    getEnemies = () => {
        const { enemy } = this.props;
        return enemy.map((char, i) => {
            return (
                <div key={char.name} className="d-flex flex-row" onClick={() => this.handleEnemyAttacked(i)}>
                    <Bar
                        max={char.stats.maxHp}
                        current={char.stats.hp}
                        type="health"
                        side="enemy"
                    />

                    <div>
                        <div className="characterNameContainer d-flex justify-content-center" style={{ transform: "translatex(5px)" }}>
                            {char.name}
                        </div>
                        <img className="characterPortrait" alt="enemy" src={char.portrait} />
                    </div>

                    <Bar
                        max={char.stats.maxMp}
                        current={char.stats.mp}
                        type="mana"
                        side="enemy"
                    />
                </div>
            )
        })
    }

    render() {
        let enemies = this.getEnemies();
        return (
            <div className='enemyInterface' >
                {enemies}
            </div>
        )
    }
}

export default EnemyInterface;