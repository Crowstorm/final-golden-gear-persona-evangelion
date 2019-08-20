import React from 'react';
import { connect } from 'react-redux';
import ShopModal from '../../components/modalInterfaces/shop/shop';
import { toggleShop } from '../../store/actions/modalActions';

// import {toggleDialogueState} from '../../store/actions/modalActions';

class ShopModalContainer extends React.Component {
    render() {
        return (
            <div>
                <ShopModal {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        modal: store.modal,
        shop: store.shop
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleShop: () => {
            dispatch(toggleShop());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopModalContainer);