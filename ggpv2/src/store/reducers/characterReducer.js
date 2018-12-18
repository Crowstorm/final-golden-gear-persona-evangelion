import produce from "immer";
import * as weapons from '../items/weapons';
import * as armor from '../items/armor';

import * as skills from '../skills/skills';

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
        armor: {
            head: armor.woodenHelmet,
            chest: armor.woodenShirt,
            shield: armor.woodenShield,
            legs: armor.woodenLegs
        },
        weapon: weapons.woodenSword
        ,
        skills: [
            skills.strongBlow,
            skills.allIn
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
            hp: 2,
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
            hp: 5,
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
            case 'BOOST_STAT':
                draft[action.i].stats[action.stat] += action.val
            default:
                return draft;
        }
    })
}