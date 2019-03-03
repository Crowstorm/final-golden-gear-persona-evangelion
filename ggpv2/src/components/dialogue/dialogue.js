import React from 'react';
import './dialogue.css';

class Dialogue extends React.Component {
    state = {
        i: 0,
        length: 0,
        effectUsed: false
    }

    componentDidUpdate = () => {
        let i = this.state.i
        //Listening for quest related events
        if (this.props.dialogue[i].effect && !this.state.effectUsed) {
            this.props.dialogue[i].effect();
            this.setState({
                effectUsed: true
            })
        }
    }

    nextDialogueLine = () => {
        if (this.state.i === this.state.length - 1) {
            this.setState({ i: 0 });
            this.setState({
                effectUsed: false
            })
            this.props.toggleDialogueState();
        } else {
            this.setState({ i: this.state.i + 1 })
            this.setState({
                effectUsed: false
            })
        }
    }

    componentDidMount() {
        //setting dialogue length to state
        this.setState({ length: this.props.dialogue.length });
    }

    render() {
        return (
            <div className="dialogue d-flex flex-column align-items-center">
                <div className="d-flex flex-row" style={{ border: "1px solid black" }}>
                    <img src="https://s3.envato.com/files/196880359/Cartoon%20King.jpg" alt="x" style={{ height: "150px" }} />
                    <div className="dialogue_text d-flex flex-column align-items-center">
                        <p>{this.props.dialogue[this.state.i].text}</p>
                    </div>
                </div>
                <button onClick={() => this.nextDialogueLine()}>Next</button>
            </div>
        )
    }
}

export default Dialogue;