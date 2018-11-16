import React from 'react';
import { connect } from 'react-redux';
import Dialogue from '../../components/dialogue/dialogue';

import {toggleDialogueState} from '../../store/actions/modalActions';

class DialogueContainer extends React.Component{
    render(){
        return(
            <div>
                <Dialogue {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (store)=>{
    return{
        modal: store.modal
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        toggleDialogueState: () =>{
            dispatch(toggleDialogueState());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogueContainer);