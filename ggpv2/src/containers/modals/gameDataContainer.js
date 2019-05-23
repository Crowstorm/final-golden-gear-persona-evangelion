import React from 'react';
import { connect } from 'react-redux';
import GameData from '../../components/modalInterfaces/gameData/gameData';


class GameDataContainer extends React.Component {
    render() {
        return (
            <div>
                <GameData {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        modal: store.modal,
        player: store.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // toggleDialogueState: () => {
        //     dispatch(toggleDialogueState());
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDataContainer);