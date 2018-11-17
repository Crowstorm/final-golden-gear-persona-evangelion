import React from 'react'

import './combat.css'

class EnemyInterface extends React.Component {
    getEnemies = () => {
        const { enemy } = this.props;
        console.log(enemy)
        return enemy.map(char => {
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

    render() {
        let enemies = this.getEnemies();
        return (
            <div className='enemyInterface' >
                {enemies}
            </div>
        )
    }
}

export default EnemyInterface;