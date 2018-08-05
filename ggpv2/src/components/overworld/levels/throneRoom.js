import React from 'react';
import _ from 'lodash';

import styles from '../level.module.css';

import { MAIN_GRID } from '../grids';

class ThroneRoom extends React.Component {
    renderMainGrid = () => {
        console.log('?')
        return _.map(MAIN_GRID, row => {
            return <div key={`row${row[0].y}`} className="row" style={{ margin: 0 }}> {_.map(row, cell => {
                return <div key={cell.x + '.' + cell.y} id={'d' + cell.x + '_' + cell.y} style={styles.gridCell}>  </div>
            })
            } </div>
        })
    };

    componentDidMount() {

    }




    render() {
        return (
            <div className="ThroneRoom">
                {this.renderMainGrid()}
            </div>
        )
    }
}

export default ThroneRoom;