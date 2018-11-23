import { changeTurn, addInfoToArray } from './combatActions';
import {allyLoseHp} from './characterActions';

const getEnemyHp = (i, getState) => {
    return getState().enemy[i].stats.hp;
}


export const enemyLoseHp = (hp, i) => {
    return function (dispatch, getState) {
        dispatch({
            type: 'ENEMY_LOSE_HP',
            hp,
            i
        })
        let remainingHp = getEnemyHp(i, getState);
        if (remainingHp <= 0) {
            dispatch(killEnemy(i));
            if (getState().enemy.length === 0) {
                alert('wygrales')
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

const getAllyEvasion = (i, getState) => {
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

const calculateAttackSuccessChance = (agility, evasion, getState) => {
    let roll = Math.floor((Math.random() * 100) + 1);
    let basicHitChance = getState().combat.basicAllyHitChance;
    let finalHitChance = basicHitChance + agility * 1.5 - evasion;
    if (finalHitChance >= roll) {
        return true;
    }
    return false;
}

const wasAttackCritical = (getState, i) => {
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
        //Wyslij info o criticalu
    } else {
        console.error('Couldnt get enemy luck');
        return wasCritical;
    }
}

const calculateEnemyDmg = (getState, i) =>{
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

const getAllyDefence = (getState, i) =>{
    let ally = getState().characters[i];
    let defence = 0;
    if (ally && ally.stats && ally.stats.defence) {
        defence += ally.stats.defence;
    } else {
        console.error('Couldnt get ally defence')
    }

    return defence;
}

const calculateTotalDmg = (getState, allyDmg, enemyDef, wasCritical) =>{
    let criticalMultiplier = getState().combat.basicCriticalMultiplier;
    if(!criticalMultiplier){
        console.error('Cant get critical multiplier');
        return 0;
    }
    let totalDmg = 0;
    if(!wasCritical){
        totalDmg += allyDmg - enemyDef;
        return totalDmg;
    } else {
        totalDmg += (allyDmg * criticalMultiplier - enemyDef/2);
        return totalDmg;
    }
}

export const enemyTurn = () => {
    console.log('indeed enemy');

    return function (dispatch, getState) {
        let enemies = getState().enemy;
        if (enemies) {
            //sort by speed stat
            enemies = enemies.slice().sort((a, b) => {
                return b.stats.speed - a.stats.speed
            })
            let noOfEnemiesAttacked = 0;

            enemies.map((enemy, i) => {
                //if special skill pick target, else pick random target
                let allyIndex = Math.floor((Math.random() * getState().characters.length));
                console.log({allyIndex})
                let enemyAgility = getEnemyAgility(i, enemies);
                let allyEvasion = getAllyEvasion(allyIndex, getState);
                let wasAttackSuccessful = calculateAttackSuccessChance(enemyAgility, allyEvasion, getState);

                if (wasAttackSuccessful) {
                    let wasCritical = wasAttackCritical(getState, i);
                    let enemyDmg = calculateEnemyDmg(getState, i);
                    console.log({wasCritical}, {enemyDmg})
                    let allyDef = getAllyDefence(getState, allyIndex);
                    let totalDmg = calculateTotalDmg(getState, enemyDmg, allyDef, wasCritical);

                    let allyName = getState().characters[allyIndex].name;
                    let info = `${enemy.name} dealth ${totalDmg} damage to ${allyName}.`;
                    dispatch(addInfoToArray(info))
                    console.log({allyDef}, {totalDmg});
                    dispatch(allyLoseHp(totalDmg, i))
                    // this.props.nextAllyTurn();
                } else {
                    let info = `${enemy.name} missed!`
                    dispatch(addInfoToArray(info))
                }
                noOfEnemiesAttacked +=1;
            })
            if(noOfEnemiesAttacked === enemies.length){
                dispatch(changeTurn('ally'))
            }
        } else {
            console.error('Couldnt get enemies')
        }


    }
}

export const nextAllyTurn = () => (dispatch, getState) => {
    let currentIndex = getState().combat.attackerIndex;
    let numberOfAllies = getState().characters.length;
    //if all ally attacked - enemy turn
    if (currentIndex + 1 === numberOfAllies) {
        console.log('ENEMY')
        dispatch(changeTurn('enemy'));
        dispatch(enemyTurn());
    } else {
        dispatch({
            type: 'INCREMENT_ATTACKER_INDEX'
        })
    }
}