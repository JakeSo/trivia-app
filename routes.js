const express = require('express');
const router = express.Router();
const GameSession = require('./backend/models/GameSession');

// Create a new game session
router.post('/game', async (req, res) => {
  try {
    const { gameCode, hostName, hostEmail } = req.body;
    const newGameSession = new GameSession({
      gameCode,
      hostName,
      hostEmail
    });
    const savedGameSession = await newGameSession.save();
    res.status(201).json(savedGameSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new player to an existing game session
router.post('/game/:gameCode/player', async (req, res) => {
  try {
    const { gameCode } = req.params;
    const { name, email } = req.body;
    const gameSession = await GameSession.findOne({ gameCode });
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }
    const newPlayer = { name, email };
    gameSession.players.push(newPlayer);
    const savedGameSession = await gameSession.save();
    res.status(201).json(savedGameSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get the current question for a game session
router.get('/game/:gameCode/question', async (req, res) => {
  try {
    const { gameCode } = req.params;
    const gameSession = await GameSession.findOne({ gameCode });
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }
    const currentQuestionIndex = gameSession.currentQuestionIndex;
    const currentQuestion = gameSession.questions[currentQuestionIndex];
    res.status(200).json(currentQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update the leaderboard for a game session
router.put('/game/:gameCode/leaderboard', async (req, res) => {
  try {
    const { gameCode } = req.params;
    const { playerId, score } = req.body;
    const gameSession = await GameSession.findOne({ gameCode });
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }
    const player = gameSession.players.id(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    player.score = score;
    gameSession.leaderboard = gameSession.players
      .map(player => ({ player, score: player.score }))
      .sort((a, b) => b.score - a.score);
    const savedGameSession = await gameSession.save();
    res.status(200).json(savedGameSession);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
