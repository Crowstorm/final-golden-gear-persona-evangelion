import React from 'react';

const ItemImage = (props) => {
    return (
        <img src={props.img} style={{ width: 64, height: 64 }} onClick={() => props.equip(props.index, props.item)} />
    )
}

export default ItemImage;