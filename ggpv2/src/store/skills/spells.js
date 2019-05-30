export const magicBullet = {
    icon: null,
    name: "Magic Bullet",
    hitChance: 90,
    costType: "mp",
    costDataType: 'int',
    cost: 2,
    dmg: 0,
    // multiplier: 2,
    dmgType: "flat",
    description: "Basic magic attack with damage depending solely on caster's magic proficiency."
}

export const fireball = {
    icon: null,
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
    icon: null,
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

export const heal = {
    icon: null,
    name: "Heal",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 7,
    dmg: 10,
    dmgType: "flat",
    aoe: false,
    buff: true,
    helpType: 'restore',
    restore: "hp",
    description: "Heals for 10"
}

export const buff = {
    icon: null,
    name: "Buff",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 7,
    buff: true,
    helpType: 'buff',
    boost: ['defence', 'agility', 'strength'],
    boostType: "flat",
    boostAmount: 5,
    boostDuration: 2,
    description: "Buff test"
}