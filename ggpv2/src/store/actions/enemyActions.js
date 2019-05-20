import { changeTurn, addInfoToArray, isHelpReady } from './combatActions';
import { allyLoseHp, checkIfCharactersAlive, grantCombatRewards, checkForMainCharTriggers } from './characterActions';
import { toggleCombatRewardsCard } from './modalActions';


export const addEnemiesToCombat = (enemies) => (dispatch) => {
    enemies.forEach((enemy, i) => {
        if (i >= 0 && i <= 3) {
            dispatch({
                type: 'ADD_ENEMY_TO_COMBAT',
                enemy
            })
        } else {
            dispatch({
                type: 'ADD_ENEMY_TO_RESERVE',
                enemy
            })
        }

    })
}

const getEnemyHp = (i) => {
    return function (dispatch, getState) {
        return getState().enemy[i].stats.hp;
    }
}

const getAllyIndex = () => {
    return function (dispatch, getState) {
        return new Promise(resolve => {
            let i = Math.floor((Math.random() * getState().characters.length));

            while (getState().characters[i].stats.hp <= 0) {
                i = Math.floor((Math.random() * getState().characters.length));
            }
            resolve(i)
        })

    }
}

export const enemyLoseHp = (hp, i) => {
    return function (dispatch, getState) {
        if (hp < 0) {
            hp = 0;
        };

        dispatch({
            type: 'ENEMY_LOSE_HP',
            hp,
            i
        })
        let remainingHp = dispatch(getEnemyHp(i));
        if (remainingHp <= 0) {
            dispatch(killEnemy(i));
            if (getState().enemy.length === 0 && getState().combat.enemiesInReserve.length === 0) {
                //Ekran z nagrodami i info
                dispatch(toggleCombatRewardsCard())
                //add rewards
                dispatch(grantCombatRewards())

            } else if (getState().combat.enemiesInReserve.length > 0 && getState().enemy.length === 0) {
                dispatch(addEnemiesFromReserve())
            }
        }
    }
}

export const killEnemy = (i) => (dispatch) => {
    dispatch({
        type: 'KILL_ENEMY',
        i
    })
}

const getEnemyAgility = (i, enemies) => {
    let enemy = enemies[i];
    let agility = 0;

    if (enemy.stats && enemy.stats.agility) {
        agility += enemy.stats.agility;
    } else {
        console.error('Couldnt get enemy agility');
    }

    return agility;
};

const getAllyEvasion = (i) => {
    return function (dispatch, getState) {
        console.log({ i })
        let ally = getState().characters[i];
        console.log({ ally })
        let evasion = 0;
        //check for bonuses to evasion
        if (ally && ally.stats && ally.stats.agility) {
            evasion += ally.stats.agility;
        } else {
            console.error('Couldnt get ally agility')
        }

        return evasion;
    }
}

const calculateAttackSuccessChance = (agility, evasion) => {
    return function (dispatch, getState) {
        let roll = Math.floor((Math.random() * 100) + 1);
        let basicHitChance = getState().combat.basicAllyHitChance;
        let finalHitChance = basicHitChance + agility * 1.5 - evasion;
        if (finalHitChance >= roll) {
            return true;
        }
        return false;
    }
}

const wasAttackCritical = (i) => {
    return function (dispatch, getState) {
        let roll = Math.floor((Math.random() * 100) + 1);
        let enemy = getState().enemy[i];
        let wasCritical = false;
        if (enemy && enemy.stats && enemy.stats.luck) {
            let luck = enemy.stats.luck;
            if (luck >= roll) {
                wasCritical = true;
                return wasCritical;
            } else {
                return wasCritical;
            }
        } else {
            console.error('Couldnt get enemy luck');
            return wasCritical;
        }
    }
}

const getWeaponDmg = (i, enemy) => {
    return new Promise(resolve => {
        // const enemy = getState().enemy[i];
        console.log({ enemy })
        if (enemy.weapon) {
            let minDmg = enemy.weapon.attack[0];
            let maxDmg = enemy.weapon.attack[1];
            let dmg = Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg;
            console.log({ dmg })
            resolve(dmg)
        } else {
            resolve(0);
        }
    })
}

const calculateEnemyDmg = (i) => {
    return async function (dispatch, getState) {
        let enemy = getState().enemy[i];
        let attack = 0;
        //sprawdz czy atakujacy ma bron z bonusami do strength
        const weaponDmg = await getWeaponDmg(i, enemy);
        console.log({ weaponDmg })
        attack += weaponDmg
        //pobierz strength postaci
        if (enemy && enemy.stats && enemy.stats.strength) {
            attack += enemy.stats.strength;
        } else {
            console.error('Couldnt get enemy attack');
        }
        console.log({ attack })
        return attack;
    }
}

const getAllyDefence = (i) => {
    return function (dispatch, getState) {
        let ally = getState().characters[i];
        let defence = 0;
        if (ally && ally.stats && ally.stats.defence) {
            defence += ally.stats.defence;
        } else {
            console.error('Couldnt get ally defence')
        }
        return defence;
    }
}

const calculateTotalDmg = (allyDmg, enemyDef, wasCritical) => {
    return function (dispatch, getState) {
        let criticalMultiplier = getState().combat.basicCriticalMultiplier;
        if (!criticalMultiplier) {
            console.error('Cant get critical multiplier');
            return 0;
        }
        let totalDmg = 0;
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
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const addEnemiesFromReserve = () => (dispatch, getState) => {
    let enemies = getState().enemy;
    let reserve = getState().combat.enemiesInReserve;
    if (enemies.length < 4 && reserve.length > 0) {
        while (enemies.length < 4 && reserve.length > 0) {

            const enemy = reserve[0];
            dispatch({
                type: 'ADD_ENEMY_TO_COMBAT',
                enemy
            })
            const info = `${enemy.name} joins the fight!`
            dispatch(addInfoToArray(info));
            dispatch({
                type: 'REMOVE_ENEMY_FROM_RESERVE'
            })

            reserve = getState().combat.enemiesInReserve;
            enemies = getState().enemy;
        }
    }
}

export const enemyTurn = () => {
    return async function (dispatch, getState) {
        let enemies = getState().enemy;
        if (enemies) {
            //sort by speed stat
            // enemies = enemies.slice().sort((a, b) => {
            //     return b.stats.speed - a.stats.speed
            // })
            let noOfEnemiesAttacked = 0;

            let offset = 1000;
            for (const [i, enemy] of enemies.entries()) {
                //if special skill pick target, else pick random target

                await timeout(offset);
                //stop combat when all characters are dead
                let areAlive = dispatch(checkIfCharactersAlive());
                if (!areAlive) {
                    return;
                }

                let allyIndex = await dispatch(getAllyIndex());
                let enemyAgility = getEnemyAgility(i, enemies);
                let allyEvasion = dispatch(getAllyEvasion(allyIndex));
                let wasAttackSuccessful = dispatch(calculateAttackSuccessChance(enemyAgility, allyEvasion));

                if (wasAttackSuccessful) {
                    let wasCritical = dispatch(wasAttackCritical(i));
                    let enemyDmg = await dispatch(calculateEnemyDmg(i));
                    console.log({ enemyDmg })
                    let allyDef = dispatch(getAllyDefence(allyIndex));
                    let totalDmg = dispatch(calculateTotalDmg(enemyDmg, allyDef, wasCritical));

                    let info = ``;
                    if (wasCritical) { info += `Critical hit! ` };
                    let allyName = getState().characters[allyIndex].name;
                    info += `${enemy.name} dealth ${totalDmg} damage to ${allyName}.`;
                    dispatch(addInfoToArray(info))

                    //Prevent main character dying and switch to ally turn if there is trigger for main char
                    const isMainCharWaitingForTrigger = dispatch(checkForMainCharTriggers());
                    const mainCharCurrentHp = getState().characters[0].stats.hp;
                    if (isMainCharWaitingForTrigger && totalDmg >= mainCharCurrentHp) {
                        totalDmg = mainCharCurrentHp - 1;
                        dispatch(allyLoseHp(totalDmg, allyIndex))
                        dispatch(changeTurn('ally'));
                        return;
                    } else {
                        dispatch(allyLoseHp(totalDmg, allyIndex))
                    }

                } else {
                    let info = `${enemy.name} missed!`
                    dispatch(addInfoToArray(info))
                }

                noOfEnemiesAttacked += 1;

                if (noOfEnemiesAttacked === enemies.length) {
                    dispatch(addEnemiesFromReserve());
                    dispatch(changeTurn('ally'))
                }
            }
        } else {
            console.error('Couldnt get enemies')
        }
    }
}

export const getAliveCharacter = () => {
    return function (dispatch, getState) {
        return new Promise(resolve => {
            let i = getState().combat.attackerIndex;

            if (getState().characters[i + 1]) {
                while (getState().characters[i + 1] && getState().characters[i + 1].stats.hp === 0) {
                    i++;
                }
            }

            dispatch({
                type: 'SET_ATTACKER_INDEX',
                i
            })
            resolve(i);
        })
    }
}