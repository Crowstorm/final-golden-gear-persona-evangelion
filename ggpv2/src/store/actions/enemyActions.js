import { changeTurn } from './combatActions';

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

export const enemyTurn = () => {
    console.log('indeed enemy');

    return function (dispatch, getState) {
        let enemies = getState().enemy;
        if (enemies) {
            //sort by speed stat
            enemies = enemies.slice().sort((a, b) => {
                return b.stats.speed - a.stats.speed
            })
            console.log(enemies)

            let noOfEnemiesAttacked = 0;

            enemies.map((enemy, i) => {
                //if special skill pick target, else pick random target
                let allyIndex = Math.floor((Math.random() * getState().characters.length));
                let enemyAgility = getEnemyAgility(i, enemies);
                console.log({enemyAgility})
            })
        } else {
            console.log('Couldnt get enemies')
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