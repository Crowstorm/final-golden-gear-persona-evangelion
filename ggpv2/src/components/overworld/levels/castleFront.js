import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { BLOCKED_CastleFront } from '../grids/blockedLevelGrids';


import { characterMovement, characterPosition } from '../levelFunctions/levelFunctions';

class CastleFront extends React.Component {

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;

        if (x === 13 && y === 22) {
            this.props.setCharacterPosition(13, 3);
            this.props.changeLevel('CastleCorridor');
        }

        if((x >=12 && x <=14) && y===1){
            this.props.setCharacterPosition(x, 24);
            this.props.changeLevel('CapitalCrossroads');
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_CastleFront);
    }, this.props.level.movementSpeed)

 

    render() {
        return (
            <div className="level castleFront">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default CastleFront;