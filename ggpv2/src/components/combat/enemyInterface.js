import React from 'react'

import './combat.css'

class EnemyInterface extends React.Component {

    getAllyAgility = () => {
        let i = this.props.combat.attackerIndex;
        let char = this.props.ally[i];
        let agility = 0;
        //sprawdz czy atakujacy ma bron z bonusami do agility

        //pobierz agility postaci
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

    calculateAttackSuccessChance = (agility, evasion) => {
        let roll = Math.floor((Math.random() * 100) + 1);
        let basicHitChance = this.props.combat.basicAllyHitChance;
        let finalHitChance = basicHitChance + agility * 1.5 - evasion;
        if (finalHitChance >= roll) {
            return true;
        }
        return false;
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
            //Wyslij info o criticalu
        } else {
            console.error('Couldnt get ally luck');
            return wasCritical;
        }
    }

    calculateAllyDmg = () =>{
        let i = this.props.combat.attackerIndex;
        let char = this.props.ally[i];
        let attack = 0;
        //sprawdz czy atakujacy ma bron z bonusami do strength

        //pobierz strength postaci
        if (char && char.stats && char.stats.strength) {
            attack += char.stats.strength;
        } else {
            console.error('Couldnt get ally attack');
        }

        return attack;
    }

    getEnemyDefence = (i) =>{
        let enemy = this.props.enemy[i];
        let defence = 0;
        if (enemy && enemy.stats && enemy.stats.defence) {
            defence += enemy.stats.defence;
        } else {
            console.error('Couldnt get enemy defence')
        }

        return defence;
    }

    calculateTotalDmg = (allyDmg, enemyDef, wasCritical) =>{
        console.log({allyDmg}, {enemyDef}, {wasCritical});
        let criticalMultiplier = this.props.combat.basicCriticalMultiplier;
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

    handleEnemyAttacked = (i) => {
        if (this.props.combat.attackReady) {
            this.props.isAttackReady(false)
            let allyAgility = this.getAllyAgility();
            let enemyEvasion = this.getEnemyEvasion(i);
            let wasAttackSuccessful = this.calculateAttackSuccessChance(allyAgility, enemyEvasion);
            //jesli atak nie wszedł zakończ turę
            if (wasAttackSuccessful) {
                let wasCritical = this.wasAttackCritical();
                let allyDmg = this.calculateAllyDmg();
                let enemyDef = this.getEnemyDefence(i);
                let totalDmg = this.calculateTotalDmg(allyDmg, enemyDef, wasCritical);
                console.log({totalDmg})
                this.props.enemyLoseHp(totalDmg, i);
            } else {
                console.log('PUDŁO')
                //oddaj ture
                return;
            }
        }
    }

    getEnemies = () => {
        const { enemy } = this.props;
        return enemy.map((char, i) => {
            return (
                <div key={char.name} onClick={() => this.handleEnemyAttacked(i)}>
                    {/* mana bar */}
                    <div className="characterNameContainer d-flex justify-content-center">
                        {char.name}
                    </div>
                    <img className="characterPortrait" alt="enemy" src={char.portrait} />
                    {/* hp bar */}
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