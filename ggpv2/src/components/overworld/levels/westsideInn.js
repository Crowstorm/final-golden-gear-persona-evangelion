import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';

import './css/levels.css';
import DialogeContainer from '../../../containers/modals/dialogueContainer';

import { BLOCKED_WestsideInn } from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class WestsideInn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogue: null
        }
    }

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

export default WestsideInn;