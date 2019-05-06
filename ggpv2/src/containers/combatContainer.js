import React from 'react';
import { connect } from 'react-redux';

import CombatScreen from '../components/combat/combatScreen';
import AllyInterface from '../components/combat/allyInterface';
import EnemyInterface from '../components/combat/enemyInterface';
import InfoPanel from '../components/combat/infoPanel';

import { isAttackReady, isHelpReady, nextAllyTurn, changeTurn, addInfoToArray, setActiveAbility, resetActiveAbility, setActiveItem, resetActiveItem } from '../store/actions/combatActions';
import { enemyLoseHp,  } from '../store/actions/enemyActions';
import { boostStat, charRestore, allyLoseMana, allyLoseHp, removeItemOrAbility, applyBuff } from '../store/actions/characterActions';


class CombatContainer extends React.Component {
    render() {
        return (
            <div>
                <CombatScreen {...this.props} />
                <AllyInterface {...this.props} />
                <EnemyInterface {...this.props} />
                <InfoPanel {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        ally: store.characters,
        enemy: store.enemy,
        combat: store.combat,
        characters: store.characters,
        event: store.event
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isAttackReady: (isReady) => {
            dispatch(isAttackReady(isReady))
        },
        isHelpReady: (isReady) => {
            dispatch(isHelpReady(isReady))
        },
        enemyLoseHp: (hp, i) => {
            dispatch(enemyLoseHp(hp, i))
        },
        changeTurn: (whoseTurn) => {
            dispatch(changeTurn(whoseTurn))
        },
        nextAllyTurn: () => {
            dispatch(nextAllyTurn())
        },
        addInfoToArray: (info) => {
            dispatch(addInfoToArray(info))
        },
        boostStat: (stat, val, i) => {
            dispatch(boostStat(stat, val, i))
        },
        allyLoseMana: (val, i) => {
            dispatch(allyLoseMana(val, i))
        },
        allyLoseHp: (dmg, i) => {
            dispatch(allyLoseHp(dmg, i))
        },
        charRestore: (statType, amount, i) => {
            dispatch(charRestore(statType, amount, i))
        },
        setActiveAbility: (type, name) => {
            dispatch(setActiveAbility(type, name))
        },
        resetActiveAbility: () => {
            dispatch(resetActiveAbility())
        },
        setActiveItem: (name) => {
            dispatch(setActiveItem(name))
        },
        resetActiveItem: () => {
            dispatch(resetActiveItem())
        },
        removeItemOrAbility: (section, name, i) => {
            dispatch(removeItemOrAbility(section, name, i))
        },
        applyBuff: (newBuffs, i) => {
            dispatch(applyBuff(newBuffs, i))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatContainer);