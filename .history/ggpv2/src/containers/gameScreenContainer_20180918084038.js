import React from 'react';
import { connect } from 'react-redux';

import Level from '../components/overworld/level';
import OverworldInterface from '../components/overworld/overworldInterface';

class GameScreenContainer extends React.Component {
    render() {
        return (
            <div>
                <OverworldInterface />
                <Level />
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenContainer);