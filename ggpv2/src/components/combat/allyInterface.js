import React from 'react';

import './combat.css';
import { Bar, Filler } from './bar';


class AllyInterface extends React.Component {
    getCharacters = () => {
        const { ally } = this.props;
        return ally.map(char => {
            return (
                <div key={char.name} className="d-flex flex-row">
                    <div>
                    <Bar
                        // percentage={50}
                        max={char.stats.maxHp}
                        current={char.stats.hp}
                        type="health"
                        side="ally"
                    />
                    </div>
                
                    <div>
                        <div className="characterNameContainer d-flex justify-content-center">
                            {char.name}
                        </div>
                        <img className="characterPortrait" alt="ally" src={char.portrait} />
                    </div>

                    <Bar
                        max={char.stats.maxMp}
                        current={char.stats.mp}
                        type="mana"
                        side="ally"
                    />
                </div>
            )
        })
    }

    componentDidMount = () => {
        // this.getCharacters();
    }

    render() {
        let mainCharacters = this.getCharacters();
        return (
            <div className="allyInterface">
                {mainCharacters}
            </div>
        )
    }
}


export default AllyInterface;