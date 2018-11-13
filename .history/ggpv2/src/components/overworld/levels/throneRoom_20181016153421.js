import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { MAIN_GRID } from '../grids/grids';
import {BLOCKED_ThroneRoom} from '../grids/blockedLevelGrids';

import {characterMovement, characterPosition} from '../levelFunctions/levelFunctions';

import king from '../../../assets/sprites/npc/king.png';

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
    }

    componentDidMount() {
        const img = { height: '35px' }
        document.addEventListener("keydown", _.throttle(this.handleKeyDown, 200));
        document.getElementById('d12_17').innerHTML = `<img style={{height: '35px', object-fit: 'cover'}}  src=${king} />`
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