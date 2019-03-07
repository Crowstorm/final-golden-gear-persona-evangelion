import React from 'react';

const ItemImage = (props) => {
    return (
        <img src={props.img} style={{ width: 64, height: 64 }} onClick={() => props.equip(0, props.item)} />
    )
}

export default ItemImage;