import React from 'react';
import _ from 'lodash';

import './gameData.css';

class GameData extends React.Component {
    loadGame = (i) => {
        this.props.loadGame(i);
    }

    renderContent = () => {
        const savedGames = this.props.player.savedGames;
        if (this.props.modal.gameDataMode === 'save') {
            //render slots

            //on click save on this slot (pass save game with i)
            return (
                <p>saves</p>
            )
        } else {
            //render slots
            //on click load game

            return savedGames.map((save, i) => {
                // const { saveSlot, levelState: { currentLevel } } = save;
                const saveSlot = _.get(save, 'saveSlot');
                const currentLevel = _.get(save, 'levelState.currentLevel');
                if (currentLevel) {
                    return (
                        <div key={i} style={{ border: "1px solid blue" }} onClick={() => this.loadGame(i)}>
                            <p>{saveSlot}</p>
                            <p>{currentLevel}</p>
                        </div>
                    )
                } else {
                    return (
                        <div key={i}>Pusty sjew</div>
                    )
                }

            })

        }
    }
    render() {
        this.props.getSavesData();
        console.log(this.props.player.savedGames);
        console.log(this.props.modal.gameDataMode);
        return (
            <div className="gameData d-flex flex-column align-items-center">
                {this.renderContent()}
            </div>
        )
    }
}

export default GameData;