import React, { Component } from 'react';

//containers
import GameScreenContainer from './containers/gameScreenContainer';


class App extends Component {
  render() {
    return (
      <div className="App container">
        <GameScreenContainer />
      </div>
    );
  }
}

export default App;
