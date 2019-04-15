import React from 'react';

// const ItemImage = (props) => {
//     handleOnClick = () => {
//         props.equip(props.index, props.item)
//     }
//     return (
//         <img src={props.img} style={{ width: 64, height: 64 }} onClick={() => this.handleOnClick()} />
//     )
// }

class ItemImage extends React.Component {
    handleOnClick = () => {
        let { equipped, type } = this.props;
        if (!equipped) {
            if(type === 'inventory'){
                this.props.equip(this.props.index, this.props.item)
            } else if (type === 'consumables'){
                console.log('iksde')
            }
        }
    }
    render() {
        return (
            <img src={this.props.img} style={{ width: 64, height: 64 }} onClick={() => this.handleOnClick()} />
        )
    }
}

export default ItemImage;