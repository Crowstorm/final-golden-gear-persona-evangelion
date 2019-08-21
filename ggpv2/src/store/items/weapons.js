import woodenSwordIcon from '../../assets/interface/equipment/weapon/woodenSword.png';
import steelSwordIcon from '../../assets/interface/equipment/weapon/steelSword.png';

import woodenStaffIcon from '../../assets/interface/equipment/weapon/woodenStaff.png';

export const woodenSword = {
    slot: "rightHand",
    name: 'Wooden Sword',
    icon: woodenSwordIcon,
    attack: [2, 5],
    bonus: {
        agility: 3
    },
    price: 40,
    itemType: 'items'
}

export const steelSword = {
    slot: "rightHand",
    name: 'Steel Sword',
    icon: steelSwordIcon,
    attack: [4, 8],
    bonus: {
        agility: 2,
        strength: 1
    },
    price: 120,
    itemType: 'items'
}



export const woodenStaff = {
    slot: "rightHand",
    name: 'Wooden Staff',
    icon: woodenStaffIcon,
    attack: [3, 4],
    bonus: {
        magic: 3
    },
    price: 40,
    itemType: 'items'
}