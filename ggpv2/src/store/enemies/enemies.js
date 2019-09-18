import * as weapons from '../items/weapons';

//bandits
import bandit_left from '../../assets/sprites/enemies/bandit/overworld/left_stand.png';
import bandit_right from '../../assets/sprites/enemies/bandit/overworld/right_stand.png';
import bandit_front from '../../assets/sprites/enemies/bandit/overworld/down_stand.png';
import bandit_back from '../../assets/sprites/enemies/bandit/overworld/up_stand.png';
import banditPortrait from '../../assets/portraits/bandit.png';
import banditLeaderPortrait from '../../assets/portraits/banditLeader.png';
//militaryPolice
import militaryPolice_left from '../../assets/sprites/enemies/militaryPolice/overworld/left_stand.png';
import militaryPolice_right from '../../assets/sprites/enemies/militaryPolice/overworld/right_stand.png';
import militaryPolice_front from '../../assets/sprites/enemies/militaryPolice/overworld/down_stand.png';
import militaryPolice_back from '../../assets/sprites/enemies/militaryPolice/overworld/up_stand.png';


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
    portrait: banditPortrait,
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    left: bandit_left,
    right: bandit_right,
    front: bandit_front,
    back: bandit_back,
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
export const bandit2 = {
    name: 'Bandit',
    portrait: banditPortrait,
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    left: bandit_left,
    right: bandit_right,
    front: bandit_front,
    back: bandit_back,
    stats: {
        maxHp: 25,
        hp: 25,
        maxMp: 0,
        mp: 0,
        defence: 4,
        magic: 5,
        magicResist: 3,
        agility: 5,
        speed: 6,
        strength: 18,
        luck: 5
    },
    weapon: weapons.woodenSword,
    loot: {
        exp: 25,
        gold: 10
    }
}
export const banditLeader = {
    name: 'Bandit Leader',
    portrait: banditLeaderPortrait,
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 35,
        hp: 35,
        maxMp: 0,
        mp: 0,
        defence: 8,
        magic: 5,
        magicResist: 8,
        agility: 12,
        speed: 6,
        strength: 16,
        luck: 5
    },
    weapon: weapons.woodenSword,
    loot: {
        exp: 100,
        gold: 50
    }
}
export const banditLeader2 = {
    name: 'Bandit Leader',
    portrait: banditLeaderPortrait,
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 35,
        hp: 35,
        maxMp: 0,
        mp: 0,
        defence: 10,
        magic: 8,
        magicResist: 4,
        agility: 15,
        speed: 6,
        strength: 25,
        luck: 5
    },
    weapon: weapons.steelSword,
    loot: {
        exp: 100,
        gold: 50
    }
}

export const wolf = {
    name: 'Wolf',
    portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 26,
        hp: 26,
        maxMp: 0,
        mp: 0,
        defence: 3,
        magic: 0,
        magicResist: 4,
        agility: 40,
        speed: 6,
        strength: 15,
        luck: 10
    },
    loot: {
        exp: 20,
        gold: 0
    }
}
export const boar = {
    name: 'Boar',
    portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    stats: {
        maxHp: 35,
        hp: 35,
        maxMp: 0,
        mp: 0,
        defence: 3,
        magic: 0,
        magicResist: 3,
        agility: 1,
        speed: 6,
        strength: 26,
        luck: 3
    },
    loot: {
        exp: 40,
        gold: 0
    }
}

export const militaryPolice = {
    name: 'Military Police',
    portrait: 'https://i.pinimg.com/originals/ce/48/b5/ce48b5ff66a976011a24ac8d7f722d5e.png',
    combatGif: 'https://i.imgur.com/R5xhCzA.png',
    left: militaryPolice_left,
    right: militaryPolice_right,
    front: militaryPolice_front,
    back: militaryPolice_back,
    stats: {
        maxHp: 40,
        hp: 40,
        maxMp: 0,
        mp: 0,
        defence: 18,
        magic: 0,
        magicResist: 15,
        agility: 20,
        speed: 6,
        strength: 22,
        luck: 10
    },
    weapon: weapons.steelSword,
    loot: {
        exp: 100,
        gold: 100
    }
}

