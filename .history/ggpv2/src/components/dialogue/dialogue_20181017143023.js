import React from 'react';
import './dialogue.css';

class Dialogue extends React.Component {
    state={
        i: 0,
        // length: this.props.dialogue.length
    }

    nextDialogueLine = () =>{
        if(this.state.i === this.state.length){
            this.props.toggleDialogueState();
        } else {
            this.setState({i: this.state.i +1})
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="dialogue d-flex flex-column align-items-center">
                <div className="d-flex flex-row" style={{border: "1px solid black"}}>
                    <img src="https://s3.envato.com/files/196880359/Cartoon%20King.jpg" style={{ height: "150px" }} />
                    <div className="dialogue_text d-flex flex-column align-items-center">
                        <p>{this.props.dialogue[this.state.i].text}</p>
                    </div>
                </div>
                <button onClick={() => this.nextDialogueLine() }>Wypad</button>
            </div>
        )
    }
}

export default Dialogue;