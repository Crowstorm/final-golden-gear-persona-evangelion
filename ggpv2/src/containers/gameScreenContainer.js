import React from 'react';
import { connect } from 'react-redux';

import CombatContainer from './combatContainer';
import MainMenuContainer from './mainMenuContainer';
import OverworldContainer from './overworldContainer';

//modals
import CharacterCard from '../components/modalInterfaces/characterCard/characterCard'

import { equip } from '../store/actions/characterActions';

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

    render() {
        let content = this.renderContent();
        return (
            <div>
                {content}
                {/* modals */}
                <CharacterCard {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        combat: store.combat,
        player: store.player,
        characters: store.characters
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