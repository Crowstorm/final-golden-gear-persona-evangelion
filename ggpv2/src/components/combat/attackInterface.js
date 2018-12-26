import React from 'react';
// import _ from 'lodash';

import './combat.css';

import AbilityNode from './helperComponents/abilityNode';


class AttackInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consumables: false,
            skills: false,
            magic: false
        };

        this.index = this.props.combat.attackerIndex;
    }

    handleAllyAttack = (attackType) => {
        if (attackType === 'basic') {
            this.props.isAttackReady(true);
        }
    }

    handleOpenConsumables = () => {
        console.log('items')
    }
    handleOpenSkills = () => {
        this.setState({
            skills: !this.state.skills
        })
    }
    handleOpenMagic = () => {
        console.log('magic')
    }

    handleRenderConsumables = () => {

    }

    handleRenderSkills = () => {
        let skills = this.props.characters[this.index].skills;
        return skills.map((skill, i) => {
            return (
                <AbilityNode
                    setActiveAbility={this.props.setActiveAbility}
                    key={i}
                    name={skill.name}
                    cost={skill.cost}
                    type={skill.costType}
                    dataType={skill.costDataType}
                    info={skill.description}
                    skill={true}
                />
            )
        })

    }

    handleRenderMagic = () => {

    }

    handleRenderAttackInterface = () => {
        const buttonStyle = {
            width: '180px',
            height: '50px',
            border: "1px solid red",
            WebkitAppearance: 'button',
        }
        let index = this.props.combat.attackerIndex;
        let portrait = this.props.characters[index].portrait;

        return (
            <div>
                <div className=" d-flex align-items-center justify-content-center" style={{ marginTop: 450, position: 'relative' }}>
                    <div className="d-flex flex-column" style={{ marginBottom: 0 }}>
                        <div className="d-flex justify-content-center flex-wrap align-items-center" style={buttonStyle} onClick={() => this.handleAllyAttack('basic')}> Basic Attack </div>
                        <div className="d-flex justify-content-center flex-wrap align-items-center" style={buttonStyle} onClick={() => this.handleOpenSkills()}> Skills </div>
                    </div>
                    <img src={portrait} alt="current char" style={{ height: 50, zIndex: 5, position: 'absolute', borderRadius: 100, border: '1px solid black' }} />
                    <div className="d-flex flex-column" style={{ marginBottom: 0 }}>
                        <div className="d-flex justify-content-center flex-wrap align-items-center" style={buttonStyle} onClick={() => this.handleOpenMagic()}> Magic </div>
                        <div className="d-flex justify-content-center flex-wrap align-items-center" style={buttonStyle} onClick={() => this.handleOpenConsumables()}> Consumables </div>
                    </div>
                </div>
            </div>

        )
    }

    render() {
        let attackInterface = (this.props.combat.whoseTurn === 'ally') ? this.handleRenderAttackInterface() : '';
        let renderAdditionalMenus = this.handleRenderSkills();
        return (
            <div id='attackInterface'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', width: 360, height: 450, border: "1px solid green" }}>
                    {renderAdditionalMenus}
                </div>
                {attackInterface}

            </div>
        )
    }
}

export default AttackInterface;