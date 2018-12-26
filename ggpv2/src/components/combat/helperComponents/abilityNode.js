import React from 'react';
import './abilityNode.css';

export default class AbilityNode extends React.Component {
    state = {
        info: false
    }

    renderInfo = () => {
        return (
            <div className="infoStyle">
                <div style={{ padding: 8 }}>
                    {this.props.info}
                </div>
                <div className="toggleButton" onClick={(e) => this.toggleInfo(e)}></div>
            </div>

        )
    }

    toggleInfo = (e) => {
        e.stopPropagation();

        this.setState({
            info: !this.state.info
        })
    }

    abilityClick = () =>{
        console.log('button');
        let type = (this.props.skill) ? 'skill' : 'magic';
        this.props.setActiveAbility(type, this.props.name);
        this.props.isAttackReady(true);
    }

    render() {

        let costDatatype = (this.props.dataType === "perc") ? "%" : '';
        //potrzebny bedzie jakis unfocus
        let info = (this.state.info) ? this.renderInfo() : null;
        return (
            <div className="skillButton d-flex flex-direction-row justify-content-between align-items-center" onClick={() => this.abilityClick()}> 
                <img className="abilityIcon" src={this.props.icon}/>
                {this.props.name} Cost: {this.props.cost}{costDatatype} {this.props.type}
                <div className="toggleButton" onClick={(e) => this.toggleInfo(e)}></div>

                {info}
            </div>
        )
    }
}