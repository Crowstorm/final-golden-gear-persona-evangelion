import produce from "immer"


const enemyDefaultState = [
    {
        name: 'European Boy1',
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
        name: 'European Boy2',
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
        name: 'European Boy3',
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
    return produce(state, draft => {
        switch (action.type) {
            case 'ENEMY_LOSE_HP':
                draft[action.i].stats.hp -= action.hp

            default:
                return draft;
        }
    })
}

export default enemyReducer;