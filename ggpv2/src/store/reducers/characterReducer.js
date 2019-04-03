import produce from "immer";
import * as weapons from '../items/weapons';
import * as armor from '../items/armor';
import * as skills from '../skills/skills';
import * as spells from '../skills/spells';
import * as items from '../items/items';

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
            hp: 25,
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
            items.healingPotion,
            items.manaPotion,
            items.healingPotion,
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
        buffs: [],
        armor: {
            head: armor.woodenHelmet,
            chest: armor.steelArmor,
            shield: armor.woodenShield,
            legs: armor.woodenLegs
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
        buffs: [],
        armor: {
            head: armor.steelHelmet,
            chest: armor.woodenShirt,
            shield: armor.woodenShield,
            legs: armor.woodenLegs
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
            defence: 1,
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
            legs: armor.steelLegs
        },
    }
];

export default (state = initial_state, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'ALLY_LOSE_HP':
                draft[action.i].stats.hp -= action.dmg
                break;
            case 'ALLY_LOSE_MP':
                draft[action.i].stats.mp -= action.val
                break;
            case 'ALLY_RESTORE':
                draft[action.i].stats[action.statType] += action.amount;
                break;
            case 'BOOST_STAT':
                draft[action.i].stats[action.stat] += action.val;
                break;
            case 'REMOVE_ITEM_OR_ABILITY':
                let array = state[0][action.section]
                draft[0][action.section].splice(action.index, 1);
                break;
            case 'ADD_TO_INVENTORY':
                draft[0].items.push(action.item);
                break;
            case 'REMOVE_FROM_INVENTORY':
                let i = draft[0].items.findIndex(item => item.name === action.item.name);
                draft[0].items.splice(i, 1);
                break;
            case 'EQUIP':
                draft[action.index].armor[action.slot] = action.item;
                break;
            case 'ADD_EXP_POINTS':
                draft[action.i].stats.exp += action.exp;
                break;
            case 'ALTER_GOLD_AMOUNT':
                draft[0].gold += action.gold;
                break;
            case 'LEVEL_UP':
                draft[action.i].stats = action.newStats;
                break;
            case 'APPLY_BUFF':
                draft[action.i].buffs = action.newBuffs;
                break;
            case 'REMOVE_BUFF':
                draft[action.charIndex].buffs.splice(action.buffIndex, 1);
                break;
            default:
                return draft;
        }
    })
}