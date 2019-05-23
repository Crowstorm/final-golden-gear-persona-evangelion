import React from 'react';
import './gameData.css';

class GameData extends React.Component {
    renderContent = () => {
        if (this.props.modal.gameDataMode === 'save') {
            //render slots

            //on click save on this slot (pass save game with i)
            return (
                <p>saves</p>
            )
        } else {
            //render slots
            //on click load game
        }
    }
    render() {

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