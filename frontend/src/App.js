import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameHost from './components/GameHost';
import GameJoin from './components/GameJoin';
import GameQuestion from './components/GameQuestion';
import Leaderboard from './components/Leaderboard';

const App = () => {
  const [gameSessionId, setGameSessionId] = useState(null);

  return (
    <Router>
      <div className="App">
        <h1>Trivia Game</h1>
        <Switch>
          <Route exact path="/" render={() => <GameHost setGameSessionId={setGameSessionId} />} />
          <Route exact path="/join" render={() => <GameJoin setGameSessionId={setGameSessionId} />} />
          <Route exact path="/game/:id" component={GameQuestion} />
          <Route exact path="/leaderboard" component={Leaderboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
