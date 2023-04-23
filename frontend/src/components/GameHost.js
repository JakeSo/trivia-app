import React, { useState } from 'react';

const GameHost = () => {
  const [gameCode, setGameCode] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    // Logic for starting the game
    setIsGameStarted(true);
  };

  return (
    <div>
      <h1>Game Host</h1>
      {!isGameStarted ? (
        <div>
          <p>Game Code: {gameCode}</p>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <p>Game has started!</p>
      )}
    </div>
  );
};

export default GameHost;
