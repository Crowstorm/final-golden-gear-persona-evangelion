import React from 'react';
// import _ from 'lodash';

import './combat.css'


class AttackInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            consumables: false,
            skills: false,
            magic: false
        };
    }

    handleAllyAttack = (attackType) => {
        if (attackType === 'basic') {
            this.props.isAttackReady(true);
        }
        // this.setState({ consumables: false });
        // this.setState({ magic: false });
        // this.setState({ skills: false });
        // let i = this.props.mechanics.attackingAllyIndex;
        // if(attackType == 'basic'){
        //     let dmg = this.props.mainChar[i].stats.strength;
        //     console.log('dmg', dmg)
        //     this.props.calculateDmg(dmg);
        //     this.props.attackReady(true);
        // }
    }

    handleOpenConsumables = () => {
        console.log('items')
    }
    handleOpenSkills = () => {
        console.log('skill')
    }
    handleOpenMagic = () => {
        console.log('magic')
    }

    handleRenderConsumables = () => {

    }

    handleRenderSkills = () => {

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
        )
    }

    // handleRenderMenus = () => {
    //     if (this.state.consumables) {
    //         return this.handleRenderConsumables();
    //     } else if (this.state.skills) {
    //         return this.handleRenderSkills();
    //     } else if (this.state.magic){
    //         return this.handleRenderMagic();
    //     } else {
    //         return null
    //     }
    // }

    render() {

        // let i = this.props.mechanics.attackingAllyIndex;
        // let renderAdditionalMenus = this.handleRenderMenus();
        let attackInterface = (this.props.combat.whoseTurn === 'ally') ? this.handleRenderAttackInterface() : ''


        return (
            <div id='attackInterface'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', width: 360, height: 450 }}>
                    {/* {renderAdditionalMenus} */}
                </div>
                {attackInterface}

            </div>
        )
    }
}

export default AttackInterface;