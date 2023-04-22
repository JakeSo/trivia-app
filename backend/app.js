const express = require('express');
const cors = require('cors');
const GameSession = require('models/GameSession');
const TriviaAPI = require('./TriviaAPI');

const app = express();
app.use(cors());
app.use(express.json());

const sessions = new Map();

// Create a new game session
app.post('/api/sessions', async (req, res) => {
  try {
    const { gameId, hostId, numQuestions } = req.body;
    const trivia = new TriviaAPI();
    const questions = await trivia.getQuestions(gameId, numQuestions);
    const session = new GameSession(gameId, hostId);
    session.createSession(hostId, questions);
    sessions.set(gameId, session);
    res.status(200).json({ gameId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Join an existing game session
app.post('/api/sessions/:gameId/join', (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId } = req.body;
    const session = sessions.get(gameId);
    if (session) {
      session.joinSession(playerId);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to join session' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
