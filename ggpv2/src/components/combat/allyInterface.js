import React from 'react';

import './combat.css';
import { Bar, Filler } from './bar';


class AllyInterface extends React.Component {
    getCharacters = () => {
        const { ally } = this.props;
        // console.log(characters)
        return ally.map(char => {
            return (
                <div key={char.name} className="d-flex flex-row">
                    {/* mana bar */}
                    <div>
                    <Bar
                        percentage={90}
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
                        percentage={30}
                        type="mana"
                        side="ally"
                    />


                    {/* hp bar */}
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