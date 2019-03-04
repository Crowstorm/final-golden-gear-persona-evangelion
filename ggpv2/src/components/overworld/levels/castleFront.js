import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { BLOCKED_ThroneRoom } from '../grids/blockedLevelGrids';


import { characterMovement, characterPosition } from '../levelFunctions/levelFunctions';

class CastleFront extends React.Component {

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;

        if ((x >= 11 && x <= 14) && y === 1) {
            this.props.setCharacterPosition(x, 24);
            this.props.changeLevel('CastleFront');
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_ThroneRoom);
    }, this.props.level.movementSpeed)

 

    render() {
        return (
            <div className="castleFront">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default CastleFront;