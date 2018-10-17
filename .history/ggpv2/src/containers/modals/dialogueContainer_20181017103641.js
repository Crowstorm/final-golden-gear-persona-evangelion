import React from 'react';
import { connect } from 'react-redux';
import Dialogue from '../../components/dialogue/dialogue';

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

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialogue);