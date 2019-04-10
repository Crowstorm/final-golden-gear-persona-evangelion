import React from 'react';
// import _ from 'lodash';

import './combat.css';

import AbilityNode from './helperComponents/abilityNode';
import ItemNode from './helperComponents/itemNode';


class AttackInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consumables: false,
            skills: false,
            magic: false,
            activeAbility: null,
            activeItem: null
        };

        // this.index = this.props.combat.attackerIndex;
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.combat.attackerIndex !== this.props.combat.attackerIndex) {
            this.setState({
                consumables: false,
                skills: false,
                magic: false,
                activeAbility: null,
                activeItem: null
            })
        }
    }

    handleAllyAttack = (attackType) => {
        if (attackType === 'basic') {
            this.props.isAttackReady(true);
        }
    }

    handleOpenConsumables = () => {
        this.setState({
            consumables: !this.state.consumables,
            skills: false,
            magic: false
        })
    }
    handleOpenSkills = () => {
        this.setState({
            skills: !this.state.skills,
            magic: false,
            consumables: false
        })
    }
    handleOpenMagic = () => {
        this.setState({
            magic: !this.state.magic,
            skills: false,
            consumables: false
        })
    }

    sortConsumablesAlphabetically = (items) => {
        return items.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
    }

    highlightItem = (i) => {
        if (i === this.state.activeItem) {
            this.setState({
                activeItem: null
            })
        } else {
            this.setState({
                activeItem: i
            })
        }
    }


    handleRenderConsumables = () => {
        let items = this.props.characters[0].consumables;
        if (items.length > 0) {
            items = this.sortConsumablesAlphabetically(items);

            return items.map((item, i) => {
                let isActive = false;
                if (i === this.state.activeItem) {
                    isActive = true;
                }
                return (
                    <ItemNode
                        key={i}
                        setActiveItem={this.props.setActiveItem}
                        highlightItem={this.highlightItem}
                        isHelpReady={this.props.isHelpReady}
                        index={i}
                        name={item.name}
                        info={item.description}
                        active={isActive}
                    />
                )
            })
        } else {
            return (
                <div style={{ color: "white" }}>
                    The backpack is empty!
            </div>
            )
        }
    }

    highlightAbility = (i) => {
        if (i === this.state.activeAbility) {
            this.setState({
                activeAbility: null
            })
        } else {
            this.setState({
                activeAbility: i
            })
        }
    }
    handleRenderSkills = () => {
        let index = this.props.combat.attackerIndex;
        let skills = this.props.characters[index].skills;
        let name = this.props.characters[index].name;

        if (!skills || skills.length === 0) {
            return <div style={{ color: "white" }}>
                {name} doesn't know any skills yet
                 </div>;
        } else {
            return skills.map((skill, i) => {
                let isActive = false;
                if (i === this.state.activeAbility) {
                    isActive = true;
                }
                return (
                    <AbilityNode
                        setActiveAbility={this.props.setActiveAbility}
                        isAttackReady={this.props.isAttackReady}
                        isHelpReady={this.props.isHelpReady}
                        highlightAbility={this.highlightAbility}
                        combat={this.props.combat}
                        ally={this.props.ally}
                        key={i}
                        index={i}
                        name={skill.name}
                        icon={skill.icon}
                        cost={skill.cost}
                        type={skill.costType}
                        dataType={skill.costDataType}
                        info={skill.description}
                        skill={true}
                        active={isActive}
                    />
                )
            })
        }
    }

    handleRenderMagic = () => {
        let index = this.props.combat.attackerIndex;
        let magic = this.props.characters[index].magic;
        let name = this.props.characters[index].name;

        if (!magic || magic.length === 0) {
            return (
                <div style={{ color: "white" }}>
                    {name} doesn't know any spells yet
                </div>
            )
        } else {
            return magic.map((spell, i) => {
                let isActive = false;
                if (i === this.state.activeAbility) {
                    isActive = true;
                }
                return (
                    <AbilityNode
                        setActiveAbility={this.props.setActiveAbility}
                        isAttackReady={this.props.isAttackReady}
                        isHelpReady={this.props.isHelpReady}
                        highlightAbility={this.highlightAbility}
                        combat={this.props.combat}
                        ally={this.props.ally}
                        key={i}
                        index={i}
                        name={spell.name}
                        icon={spell.icon}
                        cost={spell.cost}
                        type={spell.costType}
                        dataType={spell.costDataType}
                        info={spell.description}
                        skill={false}
                        active={isActive}
                    />
                )
            })
        }
    }

    handleRenderAdditionalMenus = () => {
        let { skills, consumables, magic } = this.state;
        let menu;
        if (skills) {
            menu = this.handleRenderSkills()
        } else if (consumables) {
            menu = this.handleRenderConsumables();
        } else if (magic) {
            menu = this.handleRenderMagic();
        }

        if (skills || magic || consumables) {
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