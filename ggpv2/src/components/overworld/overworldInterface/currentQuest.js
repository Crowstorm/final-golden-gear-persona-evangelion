import React from 'react';

export default class CurrentQuest extends React.Component {
    render() {
        console.log('elo?', this.props)
        return (
            <div>
                <p>Current quest:</p>
                <p>{this.props.currentQuest[0].name}</p>
            </div>
        )
    }
}