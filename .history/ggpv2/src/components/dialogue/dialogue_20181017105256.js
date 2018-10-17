import React from 'react';

class Dialogue extends React.Component{
    render(){
        return(
            <div style={{border: '1px solid red'}}>
                <p>Smierdze kasza</p>
                <button onClick={this.props.toggleDialogueState()}>Wypad</button>
            </div>
        )
    }
}

export default Dialogue;