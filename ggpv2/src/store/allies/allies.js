import * as weapons from '../items/weapons';
import * as armor from '../items/armor';
import * as skills from '../skills/skills';
import * as spells from '../skills/spells';
import * as items from '../items/items';

import shujinPortrait from '../../assets/portraits/shujin.png'
import wotahPortrait from '../../assets/portraits/wotah.png'


export const setsuna = {
    name: 'Wotah',
    portrait: wotahPortrait,
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
        spells.magicBullet,
        spells.fireball,
        spells.minorHealing,
        spells.meditate
    ],
    buffs: [],
    armor: {
        head: armor.woodenHelmet,
        chest: armor.woodenShirt,
        shield: armor.woodenShield,
        legs: armor.woodenLegs
    },
    weapon: weapons.woodenStaff
}

export const mainChar = {
    name: 'Shujin',
    portrait: shujinPortrait,
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
        skills.allIn,
        // skills.whimOfFate,
        // skills.guard
        // skills.decimate,
        // skills.whirlwind
    ],
    magic: [
        // spells.fireball,
        // spells.inferno,
        // spells.soulDrain,
        // spells.heal,
        spells.magicBullet,
        spells.minorProtection,
        // spells.meditate

    ],
    gold: 200,
    items: [
        // armor.woodenShirt,
        // armor.steelLegs,
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
    name: 'Shujin',
    portrait: shujinPortrait,
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
    ],
    magic: [
        spells.inferno,
    ],
    gold: 0,
    items: [
        // armor.woodenShirt,
        // armor.steelLegs,
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
