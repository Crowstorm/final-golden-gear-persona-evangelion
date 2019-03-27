import { changeTurn, addInfoToArray } from './combatActions';
import { allyLoseHp, checkIfCharactersAlive } from './characterActions';

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
            if (getState().enemy.length === 0) {
                alert('wygrales');
                dispatch({
                    type: 'TOGGLE_COMBAT'
                })
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

const calculateEnemyDmg = (i) => {
    return function (dispatch, getState) {
        let enemy = getState().enemy[i];
        let attack = 0;
        //sprawdz czy atakujacy ma bron z bonusami do strength

        //pobierz strength postaci
        if (enemy && enemy.stats && enemy.stats.strength) {
            attack += enemy.stats.strength;
        } else {
            console.error('Couldnt get enemy attack');
        }

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


export const enemyTurn = () => {
    return async function (dispatch, getState) {
        let enemies = getState().enemy;
        if (enemies) {
            //sort by speed stat
            enemies = enemies.slice().sort((a, b) => {
                return b.stats.speed - a.stats.speed
            })
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
                    let enemyDmg = dispatch(calculateEnemyDmg(i));
                    let allyDef = dispatch(getAllyDefence(allyIndex));
                    let totalDmg = dispatch(calculateTotalDmg(enemyDmg, allyDef, wasCritical));

                    let info = ``;
                    if (wasCritical) { info += `Critical hit! ` };
                    let allyName = getState().characters[allyIndex].name;
                    info += `${enemy.name} dealth ${totalDmg} damage to ${allyName}.`;
                    dispatch(addInfoToArray(info))

                    dispatch(allyLoseHp(totalDmg, allyIndex))

                } else {
                    let info = `${enemy.name} missed!`
                    dispatch(addInfoToArray(info))
                }

                noOfEnemiesAttacked += 1;

                if (noOfEnemiesAttacked === enemies.length) {
                    dispatch(changeTurn('ally'))
                }
            }

        } else {
            console.error('Couldnt get enemies')
        }


    }
}

const getAliveCharacter = () => {
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

export const nextAllyTurn = () => {
    return async function (dispatch, getState) {
        let currentIndex = await dispatch(getAliveCharacter());

        let numberOfAllies = getState().characters.length;
        if (currentIndex + 1 === numberOfAllies) {
            dispatch({
                type: 'RESET_ATTACKER_INDEX'
            })
            dispatch(changeTurn('enemy'));
            dispatch(enemyTurn());
        } else {
            dispatch({
                type: 'INCREMENT_ATTACKER_INDEX'
            })
        }
    }
}