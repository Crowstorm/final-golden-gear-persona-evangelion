import React from 'react';
import _ from 'lodash';

import './combat.css'

class InfoPanel extends React.Component {
    handleDmgInfo = () => {
        let test = _.map(this.props.combat.info, (raport, i) => {
            // console.log(raport)
            return <div key={i}> {raport} </div>
        });
        return (
            <div className="d-flex flex-column"> {test} </div>
        )
    }

    render() {
        let renderDmgInfo = this.handleDmgInfo();

        return (
            <div className="infoPanel align-self-end d-flex justify-content-center align-items-center flex-column" style={{}}>
                {renderDmgInfo}
            </div>
        )
    }
}

export default InfoPanel;