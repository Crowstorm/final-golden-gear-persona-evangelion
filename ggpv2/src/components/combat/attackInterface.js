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

        // this.index = this.props.combat.attackerIndex;
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.combat.attackerIndex !== this.props.combat.attackerIndex) {
            this.setState({
                consumables: false,
                skills: false,
                magic: false
            })
        }
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
        let index = this.props.combat.attackerIndex;
        let skills = this.props.characters[index].skills;
        let name = this.props.characters[index].name;
        console.log(index);
        if (skills) {
            return skills.map((skill, i) => {
                return (
                    <AbilityNode
                        setActiveAbility={this.props.setActiveAbility}
                        isAttackReady={this.props.isAttackReady}
                        key={i}
                        name={skill.name}
                        icon={skill.icon}
                        cost={skill.cost}
                        type={skill.costType}
                        dataType={skill.costDataType}
                        info={skill.description}
                        skill={true}
                    />
                )
            })
        } else {
            return <div style={{color: "white"}}>
                {name} doesn't know any skills yet
            </div>;
        }
    }

    handleRenderMagic = () => {

    }

    handleRenderAdditionalMenus = () => {
        let {skills, consumables, magic} = this.state;
        let menu;
        if (skills) {
            menu = this.handleRenderSkills()
        } else if (consumables) {
            menu = this.handleRenderConsumables();
        } else if (magic) {
            menu = this.handleRenderMagic();
        }

        if(skills || magic || consumables){
            return (
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', width: 360, height: 450, border: "2px solid silver", padding: "2px", backgroundColor: "black" }}>
                    {menu}
                </div>
            )
        } 
        return null;
      
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
        let renderAdditionalMenus = this.handleRenderAdditionalMenus();
        return (
            <div id='attackInterface'>
                {renderAdditionalMenus}
                {attackInterface}

            </div>
        )
    }
}

export default AttackInterface;