import React from 'react';

import './combat.css'


class AllyInterface extends React.Component {
    getCharacters = () => {
        const { characters } = this.props;
        console.log(characters)
        return characters.map(char => {
            return (
                <div key={char.name}>
                    {/* mana bar */}
                    <div className="characterNameContainer d-flex justify-content-center">
                        {char.name}
                    </div>
                    <img className="characterPortrait" src={char.portrait} />
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