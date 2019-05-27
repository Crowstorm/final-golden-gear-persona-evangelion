import React from 'react';
import _ from 'lodash';

import AgiIcon from '../../../assets/combat/ui/buffs/agi_buff.png'
import AtkIcon from '../../../assets/combat/ui/buffs/atk_buff.png'
import DefIcon from '../../../assets/combat/ui/buffs/def_buff.png'
import MagIcon from '../../../assets/combat/ui/buffs/mag_buff.png'
import StrIcon from '../../../assets/combat/ui/buffs/str_buff.png'

export default class AbilityNode extends React.Component {
    state = {

    }

    renderIcon = () => {
        switch (this.props.buff.stat) {
            case 'defence':
                return <img src={DefIcon} className="buffIconCombat" />
            case 'agility':
                return <img src={AgiIcon} className="buffIconCombat" />
            case 'magic':
                return <img src={MagIcon} className="buffIconCombat" />
            case 'strength':
                return <img src={StrIcon} className="buffIconCombat" />
            default:
                return;
        }
    }


    render() {
        return (
            <div>
                {this.renderIcon()}
            </div>
        )
    }
}