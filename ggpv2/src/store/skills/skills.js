// import strongBlowIcon from './icons/skillIcons/strongBlow.png';
import strongBlowIcon2 from './icons/skillIcons/strongBlow2.png';
import whirlwindIcon from './icons/skillIcons/whirlwind.png';
import allInIcon from './icons/skillIcons/allIn.png';
import decimateIcon from './icons/skillIcons/decimate.png';

// name - name of skill
// hitChance - hit chance (perc)
// costType - hp or mp
// costDataType - integer(int) or percentage(perc)
// cost - amount
// multiplier - multiplier of weapon damage + strength 
// bonus - bonus to statistic 
// dmg - damaga
// dmgType - perc or flat
// aoe - true, Area of effect

export const strongBlow = {
    icon: strongBlowIcon2,
    name: "Strong Blow",
    hitChance: 80,
    costType: "hp",
    costDataType: 'int',
    cost: 5,
    multiplier: 1.5,
    description: "Attack with double the strength."
}

export const whimOfFate = {
    icon: whirlwindIcon,
    name: "Whim of Fate",
    hitChance: 30,
    costType: "mp",
    costDataType: "int",
    cost: 3,
    dmg: 40,
    dmgType: "flat",
    description: "Overwhelming blow with a low chance of success."
}

export const allIn = {
    icon: allInIcon,
    name: "All In Attack",
    hitChance: 90,
    costType: "hp",
    costDataType: "perc",
    cost: 20,
    multiplier: 2.5,
    bonus: {
        boost: ['strength'],
        boostType: "flat",
        boostAmount: 10,
        boostDuration: 2,
    },
    description: "Devastating blow increasing strength of the user."
}

export const decimate = {
    icon: decimateIcon,
    name: "Decimate",
    hitChance: 75,
    costType: "mp",
    costDataType: "int",
    cost: 10,
    dmg: 10,
    dmgType: "perc",
    description: "Deals 10% of enemy's current health"
}

export const whirlwind = {
    icon: whirlwindIcon,
    name: "Whirlwind",
    costType: "mp",
    costDataType: "int",
    cost: 7,
    dmg: 7,
    dmgType: "flat",
    aoe: true,
    description: "Whirling strike that hits all enemies"
}

export const guard = {
    icon: null,
    name: "Guard",
    hitChance: 100,
    costType: 'mp',
    costDataType: 'int',
    cost: 3,
    buff: true,
    aoe: true,
    helpType: 'buff',
    boost: ['defence'],
    boostType: "flat",
    boostAmount: 3,
    boostDuration: 4,
    description: "Slightly rise defence of all allies for 4 turns."
}