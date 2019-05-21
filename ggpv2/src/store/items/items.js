import minorHealingPotionImg from '../../assets/interface/equipment/consumables/minor_healing_potion.png';
import minorManaPotionImg from '../../assets/interface/equipment/consumables/minor_mana_potion.png';

//actionType - restore / drain / buff / debuff/ attack

export const minorHealingPotion = {
    name: "Minor Healing Potion",
    itemType: "consumables",
    icon: minorHealingPotionImg,
    actionType: 'restore',
    type: 'hp',
    amount: 15,
    description: 'Restores 15hp to the user',
    price: 50
}

export const minorManaPotion = {
    name: "Minor Mana Potion",
    itemType: "consumables",
    icon: minorManaPotionImg,
    actionType: 'restore',
    type: 'mp',
    amount: 15,
    description: 'Restores 15mp to the user',
    price: 50

}