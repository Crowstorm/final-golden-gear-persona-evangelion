import magicBulletIcon from './icons/spellIcons/magicBullet.png';
import fireballIcon from './icons/spellIcons/fireball.png';
import infernoIcon from './icons/spellIcons/inferno.png';
import meditateIcon from './icons/spellIcons/meditate.png';
import minorProtectionIcon from './icons/spellIcons/minorProtection.png';
import healingIcon from './icons/spellIcons/healing.png';


export const magicBullet = {
    icon: magicBulletIcon,
    name: "Magic Bullet",
    hitChance: 100,
    costType: "mp",
    costDataType: 'int',
    cost: 2,
    dmg: 0,
    // multiplier: 2,
    dmgType: "flat",
    description: "Basic magic attack with damage depending solely on caster's magic proficiency."
}

export const fireball = {
    icon: fireballIcon,
    name: "Fireball",
    hitChance: 90,
    costType: "mp",
    costDataType: 'int',
    cost: 5,
    dmg: 10,
    // multiplier: 2,
    dmgType: "flat",
    description: "Ball of fire that will penetrate even the best armor of a single enemy."
}

export const inferno ={
    icon: infernoIcon,
    name: "Inferno",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 12,
    dmg: 10,
    dmgType: "flat",
    aoe: true,
    description: "Wall of flame that will engulf all enemies on the battlefield."
}

export const soulDrain ={
    icon: null,
    name: "Soul Drain",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 7,
    dmg: 10,
    dmgType: "perc",
    aoe: false,
    description: "Dunno"
}

export const meditate = {
    icon: meditateIcon,
    name: "Meditate",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    self: true, //o tutaj
    cost: 0,
    dmg: 15,
    dmgType: "flat",
    aoe: false,
    buff: true,
    helpType: 'restore',
    restore: "mp",
    description: "Caster connects with the magic realm and restores their mana. Can only target self."
}

export const minorHealing = {
    icon: healingIcon,
    name: "Minor Healing",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 5,
    dmg: 10,
    dmgType: "flat",
    aoe: false,
    buff: true,
    helpType: 'restore',
    restore: "hp",
    description: "Weaker spell that restores target's vitality."
}
export const healing = {
    icon: healingIcon,
    name: "Healing",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 10,
    dmg: 20,
    dmgType: "flat",
    aoe: false,
    buff: true,
    helpType: 'restore',
    restore: "hp",
    description: "Spell that restores target's vitality."
}

export const minorProtection = {
    icon: minorProtectionIcon,
    name: "Minor Protection",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 7,
    buff: true,
    helpType: 'buff',
    boost: ['defence', 'magicResist', 'agility'],
    boostType: "flat",
    boostAmount: 5,
    boostDuration: 2,
    description: "Slightly boosts target's defence, agility and magic resistance"
}