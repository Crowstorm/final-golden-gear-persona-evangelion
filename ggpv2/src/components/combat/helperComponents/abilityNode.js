import React from 'react';
import _ from 'lodash';

import * as spells from '../../../store/skills/spells';
import * as skills from '../../../store/skills/skills';
import './abilityNode.css';

export default class AbilityNode extends React.Component {
    state = {
        info: false,
        canUse: true,
        active: false,
    }

    componentDidMount = () => {
        let cost = this.props.cost;
        let dataType = this.props.dataType;
        let type = this.props.type;
        let i = this.props.combat.attackerIndex;
        let char = this.props.ally[i];
        let maxHp = char.stats.maxHp;
        let currentHp = char.stats.hp;
        let maxMp = char.stats.mp;
        let currentMp = char.stats.mp;

        if (type === 'mp') {
            if (dataType === 'int') {
                if (currentMp < cost) {
                    this.setState({
                        canUse: false
                    })
                } else {
                    cost = maxMp * (cost / 100);
                    if (currentMp < cost) {
                        this.setState({
                            canUse: false
                        })
                    }
                }
            }

        } else {
            if (dataType === 'int') {
                if (currentHp < cost) {
                    this.setState({
                        canUse: false
                    })
                } else {
                    cost = maxHp * (cost / 100);
                    if (currentHp < cost) {
                        this.setState({
                            canUse: false
                        })
                    }
                }
            }
        }

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

    isAbilityBuff = (abilityType, name) => {
        abilityType = (abilityType === 'skill') ? skills : spells;
        let abilityName = _.findKey(abilityType, { name: name });
        let ability = abilityType[abilityName];
        console.log({ ability })
        if (ability) {
            return ability.buff;
        } else {
            console.error('Couldnt find ability');
        }
    }

    abilityClick = () => {
        if (!this.state.canUse) return;

        let type = (this.props.skill) ? 'skill' : 'magic';
        this.props.setActiveAbility(type, this.props.name);

        //check if ability is buff or heal
        let isBuff = this.isAbilityBuff(type, this.props.name);
        console.log(isBuff);

        //prevent using when unclicked
        if (!this.props.active) {
            (isBuff) ? this.props.isHelpReady(true) : this.props.isAttackReady(true);
        } else {
            (isBuff) ? this.props.isHelpReady(false) : this.props.isAttackReady(false);
        }
        this.props.highlightAbility(this.props.index)
    }

    setBackgroundColor = () => {
        if (this.state.canUse) {
            return 'black'
        } else {
            return 'gray'
        }
    }

    setBorderColor = () => {
        if (this.props.active) {
            return '2px solid green'
        } else {
            return '2px solid silver'
        }
    }

    render() {
        let backgroundColor = this.setBackgroundColor();
        let borderColor = this.setBorderColor();
        let costDatatype = (this.props.dataType === "perc") ? "%" : '';
        //potrzebny bedzie jakis unfocus
        let info = (this.state.info) ? this.renderInfo() : null;
        return (
            <div className="skillButton d-flex flex-direction-row justify-content-between align-items-center" style={{ backgroundColor: backgroundColor, border: borderColor }} onClick={() => this.abilityClick()}>
                <img className="abilityIcon" src={this.props.icon} />
                {this.props.name} Cost: {this.props.cost}{costDatatype} {this.props.type}
                <div className="toggleButton" onClick={(e) => this.toggleInfo(e)}></div>

                {info}
            </div>
        )
    }
}