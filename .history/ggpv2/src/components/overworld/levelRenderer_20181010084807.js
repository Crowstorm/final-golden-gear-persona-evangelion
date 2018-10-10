import React from 'react';
import _ from 'lodash';
import './levelRenderer.css';

//grid generator
//levels
import ThroneRoom from './levels/throneRoom';




class Game extends React.Component {
    render() {
        return (
            <div className="level">
                <ThroneRoom />
            </div>
        )
    }
}

export default Game;