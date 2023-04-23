import React, { useState } from 'react';

const GameJoin = ({ onJoin }) => {
  const [gameCode, setGameCode] = useState('');

  const handleJoinGame = () => {
    // Logic for joining the game
    onJoin(gameCode);
    setGameCode('');
  };

  return (
    <div>
      <h1>Game Join</h1>
      <input type="text" value={gameCode} onChange={(e) => setGameCode(e.target.value)} />
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
};

export default GameJoin;
