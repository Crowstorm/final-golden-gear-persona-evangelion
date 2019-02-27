import React from 'react';
import { connect } from 'react-redux';

import MainMenuScreen from '../components/mainMenu/mainMenuScreen';

import { register, login } from '../store/actions/playerActions';

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
        register: (username, password) => {
            dispatch(register(username, password))
        },
        login: (username, password) => {
            dispatch(login(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuContainer);