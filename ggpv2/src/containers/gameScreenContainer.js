import React from 'react';
import { connect } from 'react-redux';

import CombatContainer from './combatContainer';
import MainMenuContainer from './mainMenuContainer';
import OverworldContainer from './overworldContainer';
import CombatRewardsContainer from './modals/combatRewardsContainer';

//modals
import CharacterCard from '../components/modalInterfaces/characterCard/characterCard'

import { equip } from '../store/actions/characterActions';

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
        if(helpReady){
            return 'cell';
        }

        return 'default';
    }

    render() {
        let cursor = this.getCursor();
        let content = this.renderContent();
        let characterCard = (this.props.modal.characterCardVisibility) ? <CharacterCard {...this.props} /> : null;
        let combatRewardsCard = (this.props.modal.combatRewardsCardVisibility) ? <CombatRewardsContainer /> : null;
        return (
            <div style={{ cursor: cursor }}>
                {content}
                {/* modals */}
                {/* <CharacterCard {...this.props} /> */}
                {characterCard}
                {combatRewardsCard}
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenContainer);