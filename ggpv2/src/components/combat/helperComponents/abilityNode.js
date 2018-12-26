import React from 'react';

export default class AbilityNode extends React.Component {
    state = {
        info: false
    }

    renderInfo = () => {
        const infoStyle = {
            display: "flex",
            border: "1px solid teal",
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }
        return (
            <div style={infoStyle}>
                <div style={{ padding: 8 }}>
                    {this.props.info}
                </div>
                <div style={{ width: 32, height: 32, border: "1px solid blue" }} onClick={(e) => this.toggleInfo(e)}></div>
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
    }

    render() {

        let costDatatype = (this.props.dataType === "perc") ? "%" : '';
        //potrzebny bedzie jakis unfocus
        let info = (this.state.info) ? this.renderInfo() : null;
        return (
            <div className="d-flex flex-direction-row justify-content-between align-items-center" style={{ height: 48, width: "100%",  WebkitAppearance: 'button' }} onClick={() => this.abilityClick()}> 
                <div style={{ width: 32, height: 32, border: "1px solid blue" }}></div>
                {this.props.name} Cost: {this.props.cost}{costDatatype} {this.props.type}
                <div style={{ width: 32, height: 32, border: "1px solid blue", }} onClick={(e) => this.toggleInfo(e)}></div>

                {info}
            </div>
        )
    }
}