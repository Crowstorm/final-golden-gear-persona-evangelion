import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { MAIN_GRID } from '../grids/grids';
import {BLOCKED_ThroneRoom} from '../grids/blockedLevelGrids';

import {characterMovement} from '../levelFunctions/levelFunctions';

import king from '../../../assets/sprites/npc/king_overworld.png';

class ThroneRoom extends React.Component {

    renderPosition = (cell) => {
        if (this.props.position.x === cell.x && this.props.position.y === cell.y) {
            return <img id="mainCharacter" src={this.props.position.model} style={{ height: 40, transform: 'translateY(-10px)' }} />;
        }
    }

    renderMainGrid = () => {
        return _.map(MAIN_GRID, row => {
            return <div key={`row${row[0].y}`} className="row" style={{ margin: 0 }}> {_.map(row, cell => {
                return <div key={cell.x + '.' + cell.y} id={'d' + cell.x + '_' + cell.y} className="gridCell"> {this.renderPosition(cell)}  </div>
            })
            } </div>
        })
    };

    handleKeyDown = (e) =>{
        characterMovement(this.props,e, BLOCKED_ThroneRoom);
        if ((this.props.position.x === 11 && this.props.position.y === 16) || (this.props.position.x === 12 && this.props.position.y === 16)) {
            this.props.toggleDialogueState();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", _.throttle(this.handleKeyDown, 200));
        document.getElementById('d12_17').innerHTML = `<img src=${king} />`
    }

    render() {
        return (
            <div className="throneRoom">
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default ThroneRoom;