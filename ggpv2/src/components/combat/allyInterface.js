import React from 'react';

import './combat.css'


class AllyInterface extends React.Component {
    getCharacters = () => {
        const { ally } = this.props;
        // console.log(characters)
        return ally.map(char => {
            return (
                <div key={char.name}>
                    {/* mana bar */}
                    <div className="characterNameContainer d-flex justify-content-center">
                        {char.name}
                    </div>
                    <img className="characterPortrait" alt="ally" src={char.portrait} />
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