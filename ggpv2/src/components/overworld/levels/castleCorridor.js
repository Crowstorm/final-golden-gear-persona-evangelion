import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { MAIN_GRID } from '../grids/grids';
import { BLOCKED_CastleCorridor } from '../grids/blockedLevelGrids';

import { characterMovement } from '../levelFunctions/levelFunctions';

import DialogeContainer from '../../../containers/modals/dialogueContainer';

class CastleCorridor extends React.Component {

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

    handleKeyDown = (e) => {
        let { x, y } = this.props.position;

        characterMovement(this.props, e, BLOCKED_CastleCorridor);
        // if (e.key === "Enter" && ((x === 11 && y === 16) || (x === 12 && y === 16))) {
        //     this.props.toggleDialogueState();
        // }

    }

    componentDidMount = () => {
        document.addEventListener("keydown", _.throttle(this.handleKeyDown, 50));
        // document.getElementById('d12_17').innerHTML = `<img src=${king} />`
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        console.log('test')

        // let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={dialogue} /> : '';
        return (
            <div className="castleCorridor">
                {/* {renderDialogue} */}
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default CastleCorridor;