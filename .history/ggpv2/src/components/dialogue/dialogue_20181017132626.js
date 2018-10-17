import React from 'react';
import './dialogue.css';

class Dialogue extends React.Component {
    render() {
        return (
            <div className="dialogue d-flex flex-column align-items-center">
                <div className="dialogue d-flex flex-row" style={{border: "1px solid black"}}>
                    <img src="https://s3.envato.com/files/196880359/Cartoon%20King.jpg" style={{ height: "150px" }} />
                    <div className="dialogue_text d-flex flex-column align-items-center">
                        <p>Smierdze kasza</p>
                    </div>
                </div>
                <button onClick={this.props.toggleDialogueState}>Wypad</button>
            </div>
        )
    }
}

export default Dialogue;