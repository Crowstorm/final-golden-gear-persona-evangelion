import React from 'react';
import { connect } from 'react-redux';
import Level from '../components/overworld/levelRenderer';
import OverworldInterface from '../components/overworld/overworldInterface/overworldInterface';

import { moveCharDown, moveCharUp, moveCharLeft, moveCharRight, setCharacterPosition } from '../store/actions/characterMovementActions';
import { addNewAlly, charRestore, replaceMainCharacter, addItemOrAbility, chestCleared, addExpPoints, alterGoldAmount } from '../store/actions/characterActions';
import { toggleDialogueState, addDialogue, toggleCharacterCard, toggleShop } from '../store/actions/modalActions';
import { changeLevel } from '../store/actions/levelActions';
import { setCurrentQuest, updateQuestProgress, addCombatTriggers } from '../store/actions/eventActions';
import { toggleCombat, updateCombatRewards, setBattleBackground } from '../store/actions/combatActions';
import { addEnemiesToCombat } from '../store/actions/enemyActions';
import { loadShopInventory } from '../store/actions/shopActions';


class OverworldContainer extends React.Component {
    render() {
        return (
            <div>
                <OverworldInterface {...this.props} />
                <Level {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        position: store.position,
        modal: store.modal,
        level: store.level,
        characters: store.characters,
        event: store.event,
        shop: store.shop
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //movement
        moveCharUp: () => { dispatch(moveCharUp()) },
        moveCharDown: () => { dispatch(moveCharDown()) },
        moveCharRight: () => { dispatch(moveCharRight()) },
        moveCharLeft: () => { dispatch(moveCharLeft()) },
        setCharacterPosition: (x, y) => { dispatch(setCharacterPosition(x, y)) },
        //combat
        addEnemiesToCombat: (enemies) => { dispatch(addEnemiesToCombat(enemies)) },
        setBattleBackground: (background) => { dispatch(setBattleBackground(background)) },
        updateCombatRewards: (exp, gold, items, trigger) => { dispatch(updateCombatRewards(exp, gold, items, trigger)) },
        addCombatTriggers: (combatTriggers) => dispatch(addCombatTriggers(combatTriggers)),
        charRestore: (type, amount, i) => dispatch(charRestore(type, amount, i)),
        //modals
        toggleDialogueState: () => { dispatch(toggleDialogueState()) },
        addDialogue: (dialogue) => { dispatch(addDialogue(dialogue)) },
        toggleCharacterCard: () => { dispatch(toggleCharacterCard()) },
        toggleShop: () => { dispatch(toggleShop()) },
        //level mechanics
        alterGoldAmount: (amount) => { dispatch(alterGoldAmount(amount)) },
        addExpPoints: (amount) => { dispatch(addExpPoints(amount)) },
        replaceMainCharacter: () => { dispatch(replaceMainCharacter()) },
        changeLevel: (levelName) => { dispatch(changeLevel(levelName)) },
        toggleCombat: () => { dispatch(toggleCombat()) },
        addNewAlly: (ally) => { dispatch(addNewAlly(ally)) },
        addItemOrAbility: (section, toAdd, i) => { dispatch(addItemOrAbility(section, toAdd, i)) },
        chestCleared: (name) => { dispatch(chestCleared(name)) },
        loadShopInventory: (name) => { dispatch(loadShopInventory(name)) },
        //quests
        setCurrentQuest: (name) => { dispatch(setCurrentQuest(name)) },
        updateQuestProgress: (name, progress, value) => { dispatch(updateQuestProgress(name, progress, value)) },
        // checkIfQuestTaken: (name) => { dispatch(checkIfQuestTaken(name)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverworldContainer);