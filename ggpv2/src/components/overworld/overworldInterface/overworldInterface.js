import React from 'react';
import './overworldInterface.css';

import CurrentQuest from './currentQuest';

// import _ from 'lodash'

class OverworldInterface extends React.Component {

    renderCurrentQuest = () => {
        let quest = this.props.event.questLog;
        if (quest && quest[0] && quest[0].name) {
            return quest[0].name;
        }
        return null;
    }

    render() {
        const {
            currentLevel
        } = this.props.level;
        const {
            name,
            portrait
        } = this.props.characters[0];

        let currentQuest = this.renderCurrentQuest();

        return (
            <div className="overworldInterface d-flex flex-column align-items-center">
                <div className="interfaceContainer d-flex justify-content-center flex-column align-items-center">
                    <div className="interfaceItem">
                        {currentLevel}
                    </div>

                    <div className="characterContainer interfaceItem d-flex align-items-center flex-column">
                        <div>
                            {name}
                        </div>
                        <img className="characterPortraitInterface" alt="main character" src={portrait} />
                    </div>

                    <div className="questContainer interfaceItem d-flex align-items-center flex-column">
                        <p>Current quest: </p>
                        <p>{currentQuest}</p>
                        {/* <CurrentQuest currentQuest={currentQuest} /> */}
                    </div>

                    <div className="eightbit-btn" onClick={this.props.toggleCharacterCard}>
                        Equipment
                    </div>

                    <div className="eightbit-btn" onClick={this.props.toggleGameData}>
                        Game Data
                    </div>
                </div>

            </div>
        )
    }
}

export default OverworldInterface;