import React from 'react';
import { connect } from 'react-redux';

import {moveCharDown, moveCharUp, moveCharLeft, moveCharRight} from '../actions/characterMovement';

import Level from '../components/overworld/levelRenderer';
import OverworldInterface from '../components/overworld/overworldInterface';

class GameScreenContainer extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <OverworldInterface />
                <Level {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        position: store.position
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenContainer);