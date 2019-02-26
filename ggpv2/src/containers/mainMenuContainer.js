import React from 'react';
import { connect } from 'react-redux';

import MainMenuScreen from '../components/mainMenu/mainMenuScreen';

class MainMenuContainer extends React.Component {
    render() {
        return (
            <div>
                <MainMenuScreen {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        player: store.player
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuContainer);