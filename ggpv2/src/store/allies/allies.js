import * as weapons from '../items/weapons';
import * as armor from '../items/armor';
import * as skills from '../skills/skills';
import * as spells from '../skills/spells';
import * as items from '../items/items';

export const setsuna = {
    name: 'Setsuna',
    portrait: "https://vignette.wikia.nocookie.net/fireemblem/images/b/be/Echoes_Cleric.png/revision/latest?cb=20170405045743",
    stats: {
        level: 1,
        exp: 0,
        maxHp: 25,
        hp: 25,
        maxMp: 30,
        mp: 30,
        strength: 5,
        defence: 7,
        magic: 9,
        magicResist: 9,
        agility: 9,
        luck: 5,
        speed: 5,
    },
    magic: [
        spells.fireball,
        spells.heal,
        spells.buff
    ],
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
            maxHp: 30,
            hp: 30,
            maxMp: 15,
            mp: 15,
            strength: 8,
            defence: 7,
            magic: 5,
            magicResist: 5,
            agility: 5,
            luck: 5,
            speed: 5,
        },
        buffs: [],
        armor: {
            // head: armor.woodenHelmet,
            chest: armor.woodenShirt,
            shield: armor.woodenShield,
            legs: armor.woodenLegs
        },
        weapon: weapons.woodenSword
        ,
        skills: [
            skills.strongBlow,
            // skills.allIn,
            // skills.decimate,
            // skills.whirlwind
        ],
        magic: [
            // spells.fireball,
            // spells.inferno,
            // spells.soulDrain,
            // spells.heal,
            spells.buff
        ],
        gold: 200,
        items: [
            armor.woodenShirt,
            armor.steelLegs,
            // armor.woodenShirt,
            // armor.woodenShirt,
            // armor.woodenShirt,
            // armor.steelArmor,
            // armor.woodenShirt,
            // armor.steelHelmet,
            // armor.woodenShirt,
        ],
        consumables: [
            items.minorHealingPotion,
            items.minorManaPotion,
            items.minorHealingPotion,
        ],
        questItems: [

        ]
}
export const mainCharPre = {
    name: 'BigBoss',
    portrait: "https://unknown321.github.io/mgswaifus/img/ui_face_big_boss.png",
    stats: {
        level: 100,
        exp: 0,
        maxHp: 999,
        hp: 999,
        maxMp: 999,
        mp: 999,
        strength: 99,
        defence: 99,
        magic: 99,
        magicResist: 99,
        agility: 99,
        luck: 99,
        speed: 99,
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
        skills.strongBlow,
        skills.allIn,
        skills.decimate,
        skills.whirlwind
    ],
    magic: [
        spells.fireball,
        spells.inferno,
        spells.soulDrain,
        spells.heal,
        spells.buff
    ],
    gold: 0,
    items: [
        armor.woodenShirt,
        armor.steelLegs,
        armor.woodenShirt,
        armor.woodenShirt,
        armor.woodenShirt,
        armor.steelArmor,
        armor.woodenShirt,
        armor.steelHelmet,
        armor.woodenShirt,
    ],
    consumables: [
        items.minorHealingPotion,
        items.minorManaPotion,
        items.minorHealingPotion,
    ],
    questItems: [

    ]
}
