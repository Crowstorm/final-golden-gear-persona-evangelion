import React from 'react';

const ItemImage = (props) => {
    return (
        <img src={props.img} style={{ width: 64, height: 64 }} />
    )
}

export default ItemImage;