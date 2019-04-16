import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { MAIN_GRID } from '../grids/grids';
import { BLOCKED_CastleCorridor } from '../grids/blockedLevelGrids';

import { characterMovement } from '../levelFunctions/levelFunctions';

import DialogeContainer from '../../../containers/modals/dialogueContainer';

class CastleCorridor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }  
        this.roadBlocked = [
            { text: "Guards won't let me through here", name: "Shujin" }
        ]
    }

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

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_CastleCorridor);
    
    }, this.props.level.movementSpeed)

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        if ((x >= 12 && x <= 13) && y === 24) {
            this.props.setCharacterPosition(x, 3);
            this.props.changeLevel('ThroneRoom');
        }

        if ((x >= 11 && x <= 14) && y === 2) {
            this.props.setCharacterPosition(13, 21);
            this.props.changeLevel('CastleFront');
        }

        if(((y>=5 && y <=9) && x === 2) || ((y>=5 && y <=9) && x === 24)){
            if (this.state.dialogue !== this.roadBlocked) {
                this.setState({
                    dialogue: this.roadBlocked
                })
                this.props.toggleDialogueState();
            }
        }


    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }



    render() {
        let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={this.state.dialogue} /> : null;
        return (
            <div className="castleCorridor">
                {renderDialogue}
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default CastleCorridor;