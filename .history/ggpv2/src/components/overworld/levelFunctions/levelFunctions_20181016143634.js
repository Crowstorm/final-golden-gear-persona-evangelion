import React from 'react';

import _ from 'lodash';
import { MAIN_GRID } from '../grids/grids';



export const characterMovement = (props, e, BLOCKED) => {
    switch (e.key) {
        case "ArrowUp": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y + 1 === cell.y && props.position.x === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharUp();
            }
            break;
        }
        case "ArrowDown": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y - 1 === cell.y && props.position.x === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharDown();
            }
            break;
        }
        case "ArrowLeft": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y === cell.y && props.position.x - 1 === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharLeft();
            }
            break;
        }
        case "ArrowRight": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y === cell.y && props.position.x + 1 === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharRight();
            }
            break;
        }
        default: { return }
    }
}

export const characterPosition = (props) => {
    const renderPosition = (cell) => {
        if (this.props.position.x === cell.x && this.props.position.y === cell.y) {
            return <img id="mainCharacter" src={this.props.position.model} style={{ height: 40, transform: 'translateY(-10px)' }} />;
        }
    }

    //renderPosition()

    const renderMainGrid = () => {
        return _.map(MAIN_GRID, row => {
            return <div key={`row${row[0].y}`} className="row" style={{ margin: 0 }}> {_.map(row, cell => {
                return <div key={cell.x + '.' + cell.y} id={'d' + cell.x + '_' + cell.y} className="gridCell"> {renderPosition(cell)}  </div>
            })
            } </div>
        })
    };

    renderMainGrid();
}