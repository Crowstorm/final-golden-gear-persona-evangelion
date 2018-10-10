import React from 'react';
import _ from 'lodash';

import styles from '../level.css';

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

    componentDidMount() {

    }




    render() {
        return (
            <div className="throneRoom">
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default ThroneRoom;