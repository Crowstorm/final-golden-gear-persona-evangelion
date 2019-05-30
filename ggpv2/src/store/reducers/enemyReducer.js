import produce from "immer"


const enemyDefaultState = [
   {
        name: 'First Beholder',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            maxHp: 17,
            hp: 1,
            maxMp: 0,
            mp: 0,
            defence: 4,
            magic: 5,
            magicResist: 2,
            agility: 11,
            speed: 6,
            strength: 9,
            luck: 3
        },
        loot: {
            exp: 50
        }
    },
    {
        name: '2nd Beholder',
        portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
        combatGif: 'https://i.imgur.com/R5xhCzA.png',
        stats: {
            maxHp: 170,
            hp: 140,
            maxMp: 0,
            mp: 0,
            defence: 4,
            agility: 4,
            speed: 2,
            magic: 5,
            magicResist: 3,
            strength: 15,
            luck: 12
        },
        loot: {
            exp: 50
        }
    },
    // {
    //     name: 'Third Beholder',
    //     portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    //     combatGif: 'https://i.imgur.com/R5xhCzA.png',
    //     stats: {
    //         maxHp: 170,
    //         hp: 120,
    //         maxMp: 0,
    //         mp: 0,
    //         defence: 4,
    //         agility: 7,
    //         speed: 7,
    //         magic: 5,
    //         magicResist: 5,
    //         strength: 11,
    //         luck: 14
    //     },
    //     loot: {
    //         exp: 50
    //     }
    // },
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
            case 'ADD_ENEMY_TO_COMBAT':
                draft.push(action.enemy);
                break;
            default:
                return draft;
        }
    })
}

export default enemyReducer;