import React from 'react';
import './level.css';
import GridBlocker from '../../assets/gridBlocker/gridBlocker';


import ThroneRoom from './levels/throneRoom';
import CastleCorridor from './levels/castleCorridor';


class Game extends React.Component {
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
            default:
                alert('Zjebales w level renderer')
        }
    }
    render() {
        // console.log(this.props)
        let renderCurrentLevel = this.getCurrentLevel();
        return (
            <div className="level">
                {renderCurrentLevel}
                {/* <GridBlocker {...this.props} /> */}
            </div>
        )
    }
}

export default Game;