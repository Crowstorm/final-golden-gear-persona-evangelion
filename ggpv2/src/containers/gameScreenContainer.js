import React from 'react';
import { connect } from 'react-redux';

import CombatContainer from './combatContainer';
import MainMenuContainer from './mainMenuContainer';
import OverworldContainer from './overworldContainer';

//modals
import DialogueContainer from '../containers/modals/dialogueContainer';
import CombatRewardsContainer from './modals/combatRewardsContainer';
import CharacterCard from '../components/modalInterfaces/characterCard/characterCard'
import GameDataContainer from '../components/modalInterfaces/gameData/gameData'
import ShopModalContainer from '../containers/modals/shopModalContainer';

import { equip, charRestore, removeItemOrAbility } from '../store/actions/characterActions';
import { buyItemFromShop, sellItemToShop } from '../store/actions/shopActions';
import { saveGame, getSavesData, loadGame } from '../store/actions/playerActions';
import { toggleGameData } from '../store/actions/modalActions';

//cursors
// import swordIcon from '../assets/sprites/cursor/sword.ani';
// import king from '../assets/sprites/npc/king_overworld.png';

class GameScreenContainer extends React.Component {
    overworld = () => {
        return (
            <div>
                <OverworldContainer {...this.props} />
            </div>
        )
    }

    combat = () => {
        return (
            <CombatContainer {...this.props} />
        )
    }

    mainMenu = () => {
        return (
            <MainMenuContainer {...this.props} />
        )
    }

    renderContent = () => {
        const { player, combat } = this.props;
        if (!player.isAuth) {
            return this.mainMenu();
        }

        if (combat.isCombat) {
            return this.combat();
        } else {
            return this.overworld();
        }
    }

    getCursor = () => {
        let { attackReady, helpReady } = this.props.combat;
        if (attackReady) {
            return 'crosshair';
        }
        if (helpReady) {
            return 'cell';
        }

        return 'default';
    }

    render() {
        let cursor = this.getCursor();
        let content = this.renderContent();
        let dialogue = (this.props.modal.dialogueVisibility) ? <DialogueContainer {...this.props} /> : null;
        let characterCard = (this.props.modal.characterCardVisibility) ? <CharacterCard {...this.props} /> : null;
        let combatRewardsCard = (this.props.modal.combatRewardsCardVisibility) ? <CombatRewardsContainer /> : null;
        let shopModal = (this.props.modal.shopVisibility) ? <ShopModalContainer {...this.props} /> : null;
        let gameData = (this.props.modal.gameDataVisibility) ? <GameDataContainer {...this.props} /> : null;
        return (
            <div style={{ cursor: cursor }}>
                {content}
                {/* modals */}
                {dialogue}
                {characterCard}
                {combatRewardsCard}
                {shopModal}
                {gameData}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        combat: store.combat,
        player: store.player,
        characters: store.characters,
        modal: store.modal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        equip: (i, item) => {
            dispatch(equip(i, item))
        },
        buyItemFromShop: (item) => {
            dispatch(buyItemFromShop(item))
        },
        sellItemToShop: (item) => {
            dispatch(sellItemToShop(item))
        },
        charRestore: (type, amount, i) => {
            dispatch(charRestore(type, amount, i))
        },
        removeItemOrAbility: (section, item, i) => {
            dispatch(removeItemOrAbility(section, item, i))
        },
        toggleGameData: (data) => {
            dispatch(toggleGameData(data))
        },
        saveGame: (slot) => {
            dispatch(saveGame(slot))
        },
        getSavesData: () => {
            dispatch(getSavesData())
        },
        loadGame: (i) =>{
            dispatch(loadGame(i))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenContainer);