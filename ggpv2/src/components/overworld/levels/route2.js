import React from 'react';
import _ from 'lodash';

import * as enemies from '../../../store/enemies/enemies';
import * as dialogueCharacters from '../../../store/dialogueCharacters/dialogueCharacters';

import './css/levels.css';

import { BLOCKED_Route2} from '../grids/blockedLevelGrids';

import { characterMovement, characterPosition, checkIfQuestTaken, checkQuestProgress } from '../levelFunctions/levelFunctions';

class Route2 extends React.Component {
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

        //Change levels
        if(x===1 && (y >=13 && y <=18)){
            this.props.setCharacterPosition(25, y);
            this.props.changeLevel('CapitalCrossroads');
        }
        if(x===25 && (y >=7 && y <=10)){
            this.props.setCharacterPosition(1, y);
            this.props.changeLevel('AbandonedBuilding');
        }
       
    }

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = _.throttle((e) => {
        let { x, y } = this.props.position;
        characterMovement(this.props, e, BLOCKED_Route2);

        //CHEST
        if (e.key === "Enter" && (x===8 && y ===9 || x===8 && y===8 || x===9 && y===7)) {
            //podnies itemy
            //zaznacz ze odwiedzona
            console.log('skrzynka')
        }
    }, this.props.level.movementSpeed)



    render() {
        return (
            <div className="level route2">
                {characterPosition(this.props)}
            </div>
        )
    }
}

export default Route2;