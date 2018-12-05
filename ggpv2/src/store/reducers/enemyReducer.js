import produce from "immer"


const enemyDefaultState = [
    {
        name: 'First Beholder',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            hp: 1,
            mp: 0,
            defence: 4,
            agility: 11,
            speed: 6,
            strength: 9,
            luck: 3
        }
    },
    {
        name: 'Second Beholder',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            hp: 4,
            mp: 0,
            defence: 4,
            agility: 4,
            speed: 2,
            strength: 5,
            luck: 12
        }
    },
    {
        name: 'Third Beholder',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            hp: 2,
            mp: 0,
            defence: 4,
            agility: 7,
            speed: 7,
            strength: 11,
            luck: 14
        }
    },
]

const enemyReducer = (state = enemyDefaultState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'ENEMY_LOSE_HP':
                draft[action.i].stats.hp -= action.hp
                break;
            case 'KILL_ENEMY':
                draft.splice(action.i, 1);
                break;
            default:
                return draft;
        }
    })
}

export default enemyReducer;