import React from 'react';
import { connect } from 'react-redux';

import CombatContainer from './combatContainer';
import MainMenuContainer from './mainMenuContainer';
import OverworldContainer from './overworldContainer';

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
        // let renderScreen = (this.props.combat.isCombat) ? this.combat() : this.overworld();
        let content = this.renderContent();
        return (
            <div>
                {content}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        combat: store.combat,
        player: store.player
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenContainer);