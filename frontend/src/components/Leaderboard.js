import React from 'react';

const Leaderboard = ({ players }) => {
  return (
    <div>
      <h2>Leaderboard:</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}: {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
