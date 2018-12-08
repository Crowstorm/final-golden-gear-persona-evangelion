import produce from "immer"

let initial_state = [
    {
        name: 'BigBoss',
        portrait: "https://unknown321.github.io/mgswaifus/img/ui_face_big_boss.png",
        position: {
            x: 13,
            y: 2,
            model: ''
        },
        stats: {
            level: 1,
            exp: 0,
            maxHp: 25,
            hp: 7,
            maxMp: 15,
            mp: 5,
            strength: 7,
            defence: 5,
            magic: 5,
            magicResist: 5,
            agility: 5,
            luck: 5,
            speed: 5,
        },
        quests: [

        ],
        eq: {
            head: 'https://i.pinimg.com/originals/2e/a8/51/2ea851e26242a29461b14ec21004dfe2.png',
            chest: 'http://piq.codeus.net/static/media/userpics/piq_65251_400x400.png',
            leftHand: 'https://vignette.wikia.nocookie.net/teoria/images/3/39/Piq_68684_400x400.png/revision/latest?cb=20160723153739&path-prefix=pl',
            rightHand: 'https://i.pinimg.com/originals/8b/99/48/8b9948f230b107327413d56e3d83b744.png',
            legs: 'https://orig00.deviantart.net/ba0b/f/2015/019/7/8/minecraft_leather_pants_by_dragonshadow3-d8ekmni.png'
        },
        skills: [

        ],
        magic: [
          
        ],
        items: [

        ],
        consumables: [
            
        ],
        questItems: [

        ]
    },
    {
        name: 'Ocelot',
        portrait: "https://unknown321.github.io/mgswaifus/img/ui_face_ocelot.png",
        stats: {
            level: 1,
            exp: 0,
            maxHp: 25,
            hp: 20,
            maxMp: 15,
            mp: 15,
            strength: 5,
            defence: 5,
            magic: 5,
            magicResist: 5,
            agility: 5,
            luck: 5,
            speed: 5,
        },
    },
    {
        name: 'Kaz',
        portrait: "https://unknown321.github.io/mgswaifus/img/ui_face_miller.png",
        stats: {
            level: 1,
            exp: 0,
            maxHp: 25,
            hp: 0,
            maxMp: 15,
            mp: 15,
            strength: 9,
            defence: 5,
            magic: 5,
            magicResist: 5,
            agility: 5,
            luck: 5,
            speed: 5,
        },
    },
    {
        name: 'Random Guy',
        portrait: "https://vignette.wikia.nocookie.net/metalgear/images/5/51/Ui_face_635_0.png/revision/latest?cb=20160226135114",
        stats: {
            level: 1,
            exp: 0,
            maxHp: 25,
            hp: 25,
            maxMp: 15,
            mp: 10,
            strength: 10,
            defence: 5,
            magic: 5,
            magicResist: 5,
            agility: 5,
            luck: 5,
            speed: 5,
        },
    }
];

export default (state = initial_state, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'ALLY_LOSE_HP':
                draft[action.i].stats.hp -= action.dmg
                break;
            // case 'KILL_ENEMY':
            //     draft.splice(action.i, 1);
            //     break;
            default:
                return draft;
        }
    })
}