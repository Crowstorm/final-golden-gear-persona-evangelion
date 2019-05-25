import React from 'react';
import _ from 'lodash';

import './combat.css'

class InfoPanel extends React.Component {
    handleDmgInfo = () => {
        console.log(this.props.combat.info)
        let fontSize;
        let reseter = 0;
        let test = _.map(this.props.combat.info, (raport, i) => {
            if (reseter === 4) {
                reseter = 0;
            }
            switch (reseter) {
                case 0:
                    fontSize = '16px'
                    break;
                case 1:
                    fontSize = '14px'
                    break;
                case 2:
                    fontSize = '12px'
                    break;
                case 3:
                    fontSize = '10px'
                    break;
                default:
                    console.log('nie umisz')
            }
            reseter++;
            return <div key={i} style={{ fontSize: fontSize }}> {raport} </div>
        });
        return (
            <div className="infoBox d-flex flex-column align-items-center justify-content-center"> {test} </div>
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