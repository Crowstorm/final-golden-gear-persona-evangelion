import React from 'react';
import './dialogue.css';

class Dialogue extends React.Component {
    state = {
        i: 0,
        length: 0,
        effectUsed: false
    }

    componentDidMount() {
        //setting dialogue length to state
        console.log('JESTE DIALOG')
        if (this.props.modal.dialogue) {
            this.setState({ length: this.props.modal.dialogue.length });
        }
    }

    componentDidUpdate = () => {
        let i = this.state.i;
        const dialogue = this.props.modal.dialogue;
        //Listening for quest related events
        if (dialogue && dialogue[i].effect && !this.state.effectUsed) {
            dialogue[i].effect();
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

    renderPortrait = () => {
        let i = this.state.i;
        const dialogue = this.props.modal.dialogue;
        let portrait = null;
        if (dialogue && dialogue[i]) {
            portrait = this.props.modal.dialogue[i].portrait
        }
        if (portrait) {
            return <img className="dialogue_image" src={portrait} alt="dialogue portrait" />
        }
        return <img className="dialogue_image" src="https://s3.envato.com/files/196880359/Cartoon%20King.jpg" alt="x" />
    }


    render() {
        const portrait = this.renderPortrait();
        const margin = (this.props.combat.isCombat) ? '212px' : '324px';
        return (
            <div className="dialogue d-flex flex-column align-items-center" style={{ marginLeft: margin }}>
                <div className="d-flex flex-row">
                    {portrait}
                    <div className="dialogue_text d-flex flex-column align-items-center">
                        <p>{this.props.modal.dialogue[this.state.i].text}</p>
                    </div>
                </div>
                <div className="dialogue_next" onClick={() => this.nextDialogueLine()}></div>
            </div>
        )
    }
}

export default Dialogue;