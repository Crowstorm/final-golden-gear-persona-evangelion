const enemyDefaultState = [ 
    {
        name: 'European Boy',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            hp: 2,
            mp: 0,
            defence: 4,
            agility: 7,
            speed: 6,
            strength: 31
        }
    },
    {
        name: 'European Boy',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            hp: 2,
            mp: 0,
            defence: 4,
            agility: 7,
            speed: 6,
            strength: 31
        }
    },
    {
        name: 'European Boy',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            hp: 2,
            mp: 0,
            defence: 4,
            agility: 7,
            speed: 6,
            strength: 31
        }
    },
]

const enemyReducer = (state = enemyDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ENEMY':{
            return[
                ...state,
                action.enemy
            ]
        }
        case 'CLEAR_ENEMIES':{
            return[
               
            ]
        }
        case 'LOSE_HP':
            let i = action.index;
            return [
                ...state.slice(0, i),
                {
                    ...state[i],
                    stats: {
                        ...state[i].stats,
                        hp: state[i].stats.hp - action.amount
                    }
                },
                ...state.slice(i + 1)
            ]
        case 'ENEMY_DIED':
            let j  = action.index;
            return [
                ...state.slice(0, j),
                ...state.slice(j + 1)
            ]

        default:
            return state;
    }

}

export default enemyReducer;