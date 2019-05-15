import * as weapons from '../items/weapons';


export const beholder = {
    name: 'Beholder',
    portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 17,
        hp: 1,
        maxMp: 0,
        mp: 0,
        defence: 4,
        magic: 5,
        magicResist: 2,
        agility: 11,
        speed: 6,
        strength: 13,
        luck: 3
    },
    loot: {
        exp: 50,
        gold: 10
    }
}

export const bandit = {
    name: 'Bandit',
    portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 15,
        hp: 15,
        maxMp: 0,
        mp: 0,
        defence: 2,
        magic: 5,
        magicResist: 2,
        agility: 11,
        speed: 6,
        strength: 11,
        luck: 3
    },
    weapon: weapons.woodenSword,
    loot: {
        exp: 25,
        gold: 10
    }
}
export const banditLeader = {
    name: 'Bandit Leader',
    portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 25,
        hp: 25,
        maxMp: 0,
        mp: 0,
        defence: 6,
        magic: 5,
        magicResist: 2,
        agility: 12,
        speed: 6,
        strength: 15,
        luck: 5
    },
    loot: {
        exp: 100,
        gold: 50
    }
}