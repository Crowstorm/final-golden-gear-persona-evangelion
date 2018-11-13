import React from 'react';
import './dialogue.css';

class Dialogue extends React.Component {
    render() {
        return (
            <div className="dialogue d-flex flex-column align-items-center">
                <div>
                    <p>Smierdze kasza</p>
                </div>
                <button onClick={this.props.toggleDialogueState}>Wypad</button>
            </div>
        )
    }
}

export default Dialogue;