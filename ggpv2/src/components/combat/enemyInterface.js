import React from 'react';
import _ from 'lodash';

import * as skills from '../../store/skills/skills'
import * as spells from '../../store/skills/spells';
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

    getAllyMagic = () => {
        let i = this.props.combat.attackerIndex;
        let char = this.props.ally[i];
        let magic = 0;

        if (char && char.stats && char.stats.magic) {
            magic += char.stats.magic;
        } else {
            console.error('Couldnt get ally magic');
        }

        return magic;
    }

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
        console.log({ abilityHitChance })
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

    getEnemyResistance = (i) => {
        let enemy = this.props.enemy[i];
        let res = 0;
        if (enemy && enemy.stats && enemy.stats.magicResist) {
            res += enemy.stats.magicResist;
        } else {
            console.error('Couldnt get enemy magic resistance')
        }

        return res;
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

    calculateTotalDmg = async (allyDmg, enemyDef, wasCritical, i, isSpell = false) => {
        let criticalMultiplier = this.props.combat.basicCriticalMultiplier;
        if (!criticalMultiplier) {
            console.error('Cant get critical multiplier');
            return 0;
        }

        let totalDmg = 0;
        if (!isSpell) {
            let weaponDmg = await this.getWeaponDmg(i);
            allyDmg += weaponDmg;
        }

        if (!wasCritical) {
            totalDmg += allyDmg - enemyDef;
            if (totalDmg < 0) {
                totalDmg = 0;
            }
            return totalDmg;
        } else {
            totalDmg += (allyDmg * criticalMultiplier - enemyDef / 2);
            if (totalDmg < 0) {
                totalDmg = 0;
            }
            return totalDmg;
        }
    }

    payAbilityPrice = (ability, i) => {
        let char = this.props.ally[i];
        if (ability.costType === 'mp') {
            if (ability.costDataType === 'int') {
                this.props.allyLoseMana(ability.cost, i)
            } else {
                let mana = char.stats.maxMp;
                let price = mana * (ability.cost / 100);
                this.props.allyLoseMana(price, i)
            }

        } else {
            if (ability.costDataType === 'int') {
                this.props.allyLoseHp(ability.cost, i)
            } else {
                let hp = char.stats.maxHp;
                let price = hp * (ability.cost / 100);
                this.props.allyLoseHp(price, i)
            }
        }
    }

    findAbility = (abilityType, name) => {
        let abilityName = _.findKey(abilityType, { name: name });
        let ability = abilityType[abilityName];
        if (ability) {
            return ability;
        } else {
            console.error('Couldnt find ability');
        }
    }

    handlePhysicalAttack = async (i) => {
        let combat = this.props.combat;
        let attI = this.props.combat.attackerIndex;
        let name = this.props.ally[attI].name;
        let enemies = this.props.enemy;
        let enemy = this.props.enemy[i];

        let allyAgility = this.getAllyAgility();
        let enemyEvasion = this.getEnemyEvasion(i);

        const ability = this.findAbility(skills, combat.activeAbility.name);
        this.payAbilityPrice(ability, attI);

        let wasAttackSuccessful = this.calculateAttackSuccessChance(allyAgility, enemyEvasion, ability.hitChance);

        if (wasAttackSuccessful) {
            let wasCritical = this.wasAttackCritical();
            let allyDmg = 0;
            let enemyDef = 0;
            let totalDmg = 0;

            //bonusy przed jesli sa
            if (ability.bonus) {
                let newBuffs = [];
                ability.bonus.boost.forEach(boost => {
                    const newBuff = {
                        amount: ability.bonus.boostAmount,
                        duration: ability.bonus.boostDuration,
                        stat: boost
                    }
                    newBuffs.push(newBuff);
                })

                this.props.applyBuff(newBuffs, i);
            }

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

        } else {
            let info = `${name} missed!`;
            this.props.addInfoToArray(info)
            this.props.nextAllyTurn();
        }

        //deactivate ability
        this.props.resetActiveAbility();
    }

    handleMagicAttack = async (i) => {
        let combat = this.props.combat;
        let attI = this.props.combat.attackerIndex;
        let name = this.props.ally[attI].name;
        let enemies = this.props.enemy;
        let enemy = this.props.enemy[i];

        const ability = this.findAbility(spells, combat.activeAbility.name);
        this.payAbilityPrice(ability, attI);

        let wasAttackSuccessful = this.calculateAttackSuccessChance(0, 0, ability.hitChance);

        if (wasAttackSuccessful) {
            let allyDmg = 0;
            let enemyRes = 0;
            let totalDmg = 0;

            allyDmg += this.getAllyMagic();

            if (ability.bonus) {
                let newBuffs = [];
                ability.bonus.boost.forEach(boost => {
                    const newBuff = {
                        amount: ability.boostAmount,
                        duration: ability.boostDuration,
                        stat: boost
                    }
                    newBuffs.push(newBuff);
                })

                this.props.applyBuff(newBuffs, i);
            }

            if (ability.dmgType === 'flat') {
                if (ability.aoe) {
                    let noOfEnemies = this.props.enemy.length;
                    allyDmg += ability.dmg;
                    for (let [index, enemy] of enemies.entries()) {
                        index = noOfEnemies - index - 1;
                        enemyRes = this.getEnemyResistance(index);
                        totalDmg = await this.calculateTotalDmg(allyDmg, enemyRes, false, attI, true);
                        this.props.enemyLoseHp(totalDmg, index);
                        let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
                        this.props.addInfoToArray(info);
                    }
                } else {
                    enemyRes = this.getEnemyResistance(i);
                    allyDmg += ability.dmg;
                    totalDmg = await this.calculateTotalDmg(allyDmg, enemyRes, false, attI, true);
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
        } else {
            let info = `${name} missed!`;
            this.props.addInfoToArray(info)
            this.props.nextAllyTurn();
        }

        //deactivate ability
        this.props.resetActiveAbility();
    }

    handleBasicAttack = async (i, attI, name) => {
        let enemy = this.props.enemy[i];

        let wasCritical = this.wasAttackCritical();
        let allyDmg = this.calculateAllyDmg();
        let enemyDef = this.getEnemyDefence(i);
        let totalDmg = await this.calculateTotalDmg(allyDmg, enemyDef, wasCritical, attI);

        this.props.enemyLoseHp(totalDmg, i);

        let info = `${name} dealt ${totalDmg} damage to ${enemy.name}`;
        this.props.addInfoToArray(info)
        this.props.nextAllyTurn();
    }

    handleAttackMissed = (name) => {
        let info = `${name} missed!`;
        this.props.addInfoToArray(info)
        this.props.nextAllyTurn();
    }


    // calculates damage and/or effects affecting targeted enemy
    handleEnemyAttacked = async (i) => {
        let combat = this.props.combat;
        let attI = this.props.combat.attackerIndex;
        let name = this.props.ally[attI].name;

        if (combat.attackReady && combat.whoseTurn === 'ally') {
            this.props.isAttackReady(false)

            if (combat.activeAbility.type === 'magic') {
                this.handleMagicAttack(i);
            } else if (combat.activeAbility.type === 'skill') {
                this.handlePhysicalAttack(i);
            } else {
                let allyAgility = this.getAllyAgility();
                let enemyEvasion = this.getEnemyEvasion(i);
                let wasAttackSuccessful = this.calculateAttackSuccessChance(allyAgility, enemyEvasion);

                if (wasAttackSuccessful) {
                    this.handleBasicAttack(i, attI, name);
                } else {
                    this.handleAttackMissed(name);
                }
            }
        }
    }


    getEnemies = () => {
        const { enemy } = this.props;
        return enemy.map((char, i) => {
            return (
                <div key={char.name + i} className="d-flex flex-row" onClick={() => this.handleEnemyAttacked(i)}>
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