import React from 'react';
import _ from 'lodash';

import './css/levels.css';
import { BLOCKED_ThroneRoom } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition } from '../levelFunctions/levelFunctions';

class Level extends React.Component {

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
      
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_xxx);
    }, this.props.level.movementSpeed)

 

    render() {
        return (
            <div className="xxx">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default Level;