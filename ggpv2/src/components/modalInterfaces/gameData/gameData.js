import React from 'react';
import _ from 'lodash';

import './gameData.css';

const SaveInfo = (props) => {
    return (
        <div
            className="d-flex flex-row justify-content-between"
            style={{ width: '80%', height: '50px', border: '3px solid black', margin: 8 }}
            onClick={props.onClick}
        >
            <div style={{ height: 50, width: 50, textAlign: 'center' }} className="d-flex  justify-content-center align-items-center">
                {props.saveSlot}
            </div>
            <div className="d-flex  justify-content-center align-items-center" style={{ width: '100%' }}>
                Lvl {props.characterLevel} / {(props.currentQuest) ? props.currentQuest.name : ''} / {props.currentLevel}
            </div>
        </div>
    )
}

class GameData extends React.Component {
    state = {
        gameDataMode: 'load'
    }

    componentDidMount = () => {
        this.props.getSavesData();
    }

    // componentDidUpdate = (prevProps) => {
    //     if (this.props.player.savedGames !== prevProps.player.savedGames) {
    //         console.log('?')
    //         this.props.getSavesData();
    //     }
    // }

    loadGame = (i) => {
        this.props.loadGame(i);
    }
    saveGame = (i) => {
        this.props.saveGame(i);
    }

    modesContainer = () => {
        const loadGameBorder = (this.state.gameDataMode === 'load') ? '3px solid green' : '3px solid black'
        const saveGameBorder = (this.state.gameDataMode === 'save') ? '3px solid green' : '3px solid black'
        if (!this.props.combat.gameOver) {
            return (
                <div style={{ width: '80%' }}
                    className="d-flex flex-row justify-content-around"
                >
                    <div style={{ border: loadGameBorder, padding: 8 }} onClick={() => this.setState({ gameDataMode: 'load' })}>Load Game</div>

                    {(!this.props.combat.isCombat) ? <div style={{ border: saveGameBorder, padding: 8 }} onClick={() => this.setState({ gameDataMode: 'save' })}>Save Game</div> : null}
                </div>
            )
        }
    }

    renderContent = () => {
        const { savedGames } = this.props.player;
        const { gameDataMode } = this.state;
        if (this.props.combat.gameOver) {
            return (
                <button onClick={() => window.location.reload()}>Game Over</button>
            )
        }
        else if (gameDataMode === 'save') {
            return savedGames.map((save, i) => {
                // const { saveSlot, levelState: { currentLevel } } = save;
                const saveSlot = _.get(save, 'saveSlot');
                const currentLevel = _.get(save, 'levelState.currentLevel');
                const characterLevel = _.get(save, 'characterState[0].stats.level');
                const currentQuest = _.get(save, 'eventState.currentQuest');
                if (currentLevel) {
                    return (
                        <SaveInfo
                            key={i}
                            saveSlot={saveSlot}
                            currentQuest={currentQuest}
                            currentLevel={currentLevel}
                            characterLevel={characterLevel}
                            onClick={() => this.saveGame(i)}
                        />
                    )
                } else {
                    return (
                        <div key={i} className="d-flex flex-row justify-content-between"
                            style={{ width: '80%', height: '50px', border: '3px solid black', margin: 8 }}
                        >
                            <div style={{ height: 50, width: 50, textAlign: 'center' }} className="d-flex  justify-content-center align-items-center">
                                {i}
                            </div>

                            <div className="d-flex  justify-content-center align-items-center" style={{ width: '100%' }} onClick={() => this.saveGame(i)}>
                                Empty Slot
                            </div>
                        </div>
                    )
                }
            })
        } else {
            return savedGames.map((save, i) => {
                // const { saveSlot, levelState: { currentLevel } } = save;
                const saveSlot = _.get(save, 'saveSlot');
                const currentLevel = _.get(save, 'levelState.currentLevel');
                const characterLevel = _.get(save, 'characterState[0].stats.level');
                const currentQuest = _.get(save, 'eventState.currentQuest');
                if (currentLevel) {
                    return (
                        <SaveInfo
                            key={i}
                            saveSlot={saveSlot}
                            currentQuest={currentQuest}
                            currentLevel={currentLevel}
                            characterLevel={characterLevel}
                            onClick={() => this.loadGame(i)}
                        />
                    )
                } else {
                    return (
                        <div key={i} className="d-flex flex-row justify-content-between"
                            style={{ width: '80%', height: '50px', border: '3px solid black', margin: 8 }}
                        >
                            <div style={{ height: 50, width: 50, textAlign: 'center' }} className="d-flex  justify-content-center align-items-center">
                                {i}
                            </div>

                            <div className="d-flex  justify-content-center align-items-center" style={{ width: '100%' }}>
                                Empty Slot
                            </div>
                        </div>
                    )
                }
            })

        }
    }
    render() {
        return (
            <div className="gameData d-flex flex-column align-items-center justify-content-center">
                {this.modesContainer()}
                {this.renderContent()}
            </div>
        )
    }
}

export default GameData;