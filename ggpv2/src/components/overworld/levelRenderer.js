import React from 'react';
import './level.css';
import GridBlocker from '../../assets/gridBlocker/gridBlocker';


import ThroneRoom from './levels/throneRoom';
import CastleCorridor from './levels/castleCorridor';
import CastleFront from './levels/castleFront';
import CapitalCrossroads from './levels/capitalCrossroads';
import Route1 from './levels/route1';
import Route2 from './levels/route2';
import WestsideInn from './levels/westsideInn';
import WestsideInnBedrooms from './levels/westsideInnBedrooms';
import AbandonedBuilding from './levels/abandonedBuilding';
import AbandonedBuildingInside from './levels/abandonedBuildingInside';
import CapitalForest from './levels/capitalForest';
import CampBattlefield from './levels/campBattlefield';


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
            case "CapitalCrossroads":
                return (
                    <CapitalCrossroads {...this.props} />
                )
            case "Route1":
                return (
                    <Route1 {...this.props} />
                )
            case "Route2":
                return (
                    <Route2 {...this.props} />
                )
            case "WestsideInn":
                return (
                    <WestsideInn {...this.props} />
                )
            case "WestsideInnBedrooms":
                return (
                    <WestsideInnBedrooms {...this.props} />
                )
            case "AbandonedBuilding":
                return (
                    <AbandonedBuilding {...this.props} />
                )
            case "AbandonedBuildingInside":
                return (
                    <AbandonedBuildingInside {...this.props} />
                )
            case "CapitalForest":
                return (
                    <CapitalForest {...this.props} />
                )
            case "CampBattlefield":
                return (
                    <CampBattlefield {...this.props} />
                )
            default:
                console.error("Can't render current level")
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
                <button style={{ float: "right", marginTop: 50, zIndex: 10000 }} onClick={() => this.toggleGridBlocker()}>GridBlocker</button>

            </div>
        )
    }
}

export default Game;