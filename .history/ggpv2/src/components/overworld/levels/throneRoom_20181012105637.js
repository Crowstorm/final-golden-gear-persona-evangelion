import React from 'react';
import _ from 'lodash';

import './css/levels.css';

import { MAIN_GRID } from '../grids/grids';

class ThroneRoom extends React.Component {
    renderMainGrid = () => {
        return _.map(MAIN_GRID, row => {
            return <div key={`row${row[0].y}`} className="row" style={{ margin: 0 }}> {_.map(row, cell => {
                return <div key={cell.x + '.' + cell.y} id={'d' + cell.x + '_' + cell.y} className="gridCell">  </div>
            })
            } </div>
        })
    };

    renderPosition = (cell) => {
        if (this.props.charPosition.x === cell.x && this.props.charPosition.y === cell.y) {
            return <img src={this.props.charPosition.model} style={{ height: 40, transform: 'translateY(-10px)' }} />;
        }
    }

    componentDidMount() {

    }




    render() {
        console.log('propsy w levelu', this.props);
        return (
            <div className="throneRoom">
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default ThroneRoom;