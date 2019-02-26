import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { MAIN_GRID } from '../grids/grids';
import { BLOCKED_ThroneRoom } from '../grids/blockedLevelGrids';

import { characterMovement } from '../levelFunctions/levelFunctions';

import king from '../../../assets/sprites/npc/king_overworld.png';

import DialogeContainer from '../../../containers/modals/dialogueContainer';

class ThroneRoom extends React.Component {

    renderPosition = (cell) => {
        if (this.props.position.x === cell.x && this.props.position.y === cell.y) {
            return <img id="mainCharacter" alt="mainCharacter" src={this.props.position.model} style={{ height: 40, transform: 'translateY(-10px)' }} />;
        }
    }

    renderMainGrid = () => {
        return _.map(MAIN_GRID, row => {
            return <div key={`row${row[0].y}`} className="row" style={{ margin: 0, boxSizing: 'border-box' }}> {_.map(row, cell => {
                return <div key={cell.x + '.' + cell.y} id={'d' + cell.x + '_' + cell.y} className="gridCell"> {this.renderPosition(cell)}  </div>
            })
            } </div>
        })
    };

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_ThroneRoom);
        if (e.key === "Enter" && ((x === 11 && y === 16) || (x === 12 && y === 16))) {
            this.props.toggleDialogueState();
        }
    }, this.props.level.movementSpeed)

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        document.getElementById('d12_17').innerHTML = `<img src=${king} />`
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;

        if (x === 12 && y === 2) {
            this.props.setCharacterPosition(5,5);
            this.props.changeLevel('CastleCorridor');
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        const dialogue = [
            { text: "Thank you for coming. As you already heard, the princess had been kidnapped.", name: "King Horace" },
            { text: "And in this time of need we know that we can count on you.", name: "King Horace" },
            { text: "We've already sent our best men, but the truth is anyone could be involved in her disappearance.", name: "King Horace" },
            { text: "It is to our understanding that you care deeply for our daughter. If you save her you shall be offered her hand.", name: "King Horace" },
            { text: "Essentialy making you the Prince of the Realm.", name: "King Horace" },
            { text: "She was last seen on the streets near the Inn. That's not the first time something bad happened there. During the night bandits are patrolling this area.", name: "King Horace" },
            { text: "Now go, my friend, and save the Princess. Time might be running short.", name: "King Horace" }
        ]

        let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={dialogue} /> : '';
        return (
            <div className="throneRoom">
                {renderDialogue}
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default ThroneRoom;