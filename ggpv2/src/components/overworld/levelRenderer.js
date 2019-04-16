import React from 'react';
import './level.css';
import GridBlocker from '../../assets/gridBlocker/gridBlocker';


import ThroneRoom from './levels/throneRoom';
import CastleCorridor from './levels/castleCorridor';
import CastleFront from './levels/castleFront';


class Game extends React.Component {
    state = {
        gridBlocker: false
    }
    getCurrentLevel = () => {
        switch (this.props.level.currentLevel) {
            case "ThroneRoom":
                return (
                    <ThroneRoom {...this.props} />
                )
            case "CastleCorridor":
                return (
                    <CastleCorridor {...this.props} />
                )
            case "CastleFront":
                return (
                    <CastleFront {...this.props} />
                )
            default:
                alert('blad w level renderer')
        }
    }

    toggleGridBlocker = () => {
        this.setState({
            gridBlocker: !this.state.gridBlocker
        })
        console.log(this.state.gridBlocker)
    }
    render() {
        let renderCurrentLevel = this.getCurrentLevel();
        let gridBlocker = (this.state.gridBlocker) ? <GridBlocker {...this.props} /> : null;

        return (
            <div className="level">
                {renderCurrentLevel}
                {gridBlocker}
                <button style={{float: "right", marginTop: 50, zIndex: 10000}} onClick={() => this.toggleGridBlocker()}>GridBlocker</button>

            </div>
        )
    }
}

export default Game;