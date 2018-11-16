import React, { Component } from 'react';
import './app.css'

//containers
import GameScreenContainer from './containers/gameScreenContainer';


class App extends Component {
  render() {
    return (
        <div className="gameContainer container">
          <GameScreenContainer />
        </div>
    );
  }
}

export default App;
