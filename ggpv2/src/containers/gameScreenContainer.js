import React from 'react';
import { connect } from 'react-redux';

import Level from '../components/overworld/level';

class GameScreenContainer extends React.Component {
    render() {
        return (
            <div>
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