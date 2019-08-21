import React from 'react';
import ReactTooltip from 'react-tooltip';

import './abilityNode.css';

export default class ItemNode extends React.Component {
    state = {
        info: false,
        active: false,
    }

    itemClick = () => {
        this.props.setActiveItem(this.props.name);
        this.props.highlightItem(this.props.index);

        //prevent using when unclicked
        if (!this.props.active) {
            this.props.isHelpReady(true)
        } else {
            this.props.isHelpReady(false)
        }
    }

    renderTooltipWithInfo = () => {
        return (
            <ReactTooltip id={this.props.name} aria-haspopup='true' role='example' className="d-flex flex-column align-content-center align-items-center justify-content-center">
                {this.props.info}
            </ReactTooltip>
        )
    }

    setBorderColor = () => {
        if (this.props.active) {
            return '2px solid green'
        } else {
            return '2px solid silver'
        }
    }


    render() {
        let info = (this.state.info) ? this.renderInfo() : null;
        let borderColor = this.setBorderColor();

        return (
            <div
                data-tip data-for={this.props.name}
                className="skillButton d-flex flex-direction-row justify-content-between align-items-center"
                style={{ border: borderColor }}
                onClick={() => this.itemClick()}
            >
                <img className="abilityIcon" src={this.props.icon} />
                <div style={{width: "100%", textAlign: 'center'}}>
                    {this.props.name}
                </div>
                {this.renderTooltipWithInfo()}
            </div>
        )
    }
}