import React from 'react';
import _ from 'lodash';

import './css/levels.css';
import DialogeContainer from '../../../containers/modals/dialogueContainer';

import { BLOCKED_WestsideInn } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class WestsideInnBedrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
        this.drugged = [
            { text: "Ughhh...", name: "Shujin" },
            { text: "What happened?", name: "Shujin" },
            { text: "Looks like I'm still at the inn, I better check on the lady, I hope she's alright", name: "Shujin" },
        ]
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleKeyDown);
        if (this.state.dialogue !== this.drugged) {
            this.setState({
                dialogue: this.drugged
            })
            this.props.toggleDialogueState();
        }
    }

    componentDidUpdate() {
        let { x, y } = this.props.position;
        let { dialogueVisibility } = this.props.modal;
        if (dialogueVisibility) {
            document.removeEventListener("keydown", this.handleKeyDown);
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }

        if (x === 12 && y === 13) {
            this.props.setCharacterPosition(10, 10);
            this.props.changeLevel('WestsideInn');
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_WestsideInn);
    }, this.props.level.movementSpeed)



    render() {
        let renderDialogue = (this.props.modal.dialogueVisibility) ? <DialogeContainer dialogue={this.state.dialogue} /> : '';
        return (
            <div className="level westsideInn">
                {renderDialogue}
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default WestsideInnBedrooms;