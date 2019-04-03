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
    description: "Goronce "
}

export const inferno ={
    icon: null,
    name: "Inferno",
    hitChance: 100,
    costType: "mp",
    costDataType: "int",
    cost: 7,
    dmg: 10,
    dmgType: "flat",
    aoe: true,
    description: "Smells like chicken"
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
    boost: ['all'],
    boostType: "flat",
    boostAmount: 5,
    boostDuration: 2,
    description: "Buff test"
}