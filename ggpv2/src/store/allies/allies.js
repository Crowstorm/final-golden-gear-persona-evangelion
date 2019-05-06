import * as weapons from '../items/weapons';
import * as armor from '../items/armor';
import * as skills from '../skills/skills';
import * as spells from '../skills/spells';
import * as items from '../items/items';

export const ocelot = {
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
    buffs: [],
    armor: {
        head: armor.woodenHelmet,
        chest: armor.steelArmor,
        shield: armor.woodenShield,
        legs: armor.woodenLegs
    },
}

export const mainChar = {
    name: 'BigBoss',
    portrait: "https://unknown321.github.io/mgswaifus/img/ui_face_big_boss.png",
    stats: {
        level: 1,
        exp: 0,
        maxHp: 25,
        hp: 1,
        maxMp: 15,
        mp: 15,
        strength: 7,
        defence: 5,
        magic: 5,
        magicResist: 5,
        agility: 5,
        luck: 5,
        speed: 5,
    },
    buffs: [],
    armor: {
        head: armor.woodenHelmet,
        chest: armor.woodenShirt,
        shield: armor.woodenShield,
        legs: armor.woodenLegs
    },
    weapon: weapons.woodenSword
    ,
    skills: [

    ],
    magic: [

    ],
    gold: 0,
    items: [

    ],
    consumables: [

    ],
    questItems: [

    ]
}
