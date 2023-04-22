const express = require('express');
const router = express.Router();
const axios = require('axios');
const GameSession = require('../models/GameSession');

// Get the current question for the game session
router.get('/:sessionId/question', async (req, res) => {
  const sessionId = req.params.sessionId;
  const session = GameSession.getSessionById(sessionId);
  if (!session) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  try {
    // Call the Trivia API to get a random question
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 1,
        category: session.category,
        difficulty: session.difficulty,
        type: 'multiple',
      },
    });

    // Extract the relevant data from the API response
    const questionData = response.data.results[0];
    const question = {
      text: questionData.question,
      choices: questionData.incorrect_answers.concat(questionData.correct_answer),
      answer: questionData.correct_answer,
    };

    // Add the question to the session and return it
    const currentQuestion = session.addQuestion(question);
    res.json(currentQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting question' });
  }
});

// Submit an answer for the current question
router.post('/:sessionId/answer', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = GameSession.getSessionById(sessionId);
  if (!session) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  const playerId = req.body.playerId;
  const answer = req.body.answer;

  // Check if the answer is correct and update the player's score
  const isCorrect = session.checkAnswer(playerId, answer);
  if (isCorrect) {
    res.json({ message: 'Correct!' });
  } else {
    res.json({ message: 'Incorrect' });
  }
});

// Get the leaderboard for the game session
router.get('/:sessionId/leaderboard', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = GameSession.getSessionById(sessionId);
  if (!session) {
    res.status(404).json({ error: 'Session not found' });
    return;
  }

  const leaderboard = session.getLeaderboard();
  res.json(leaderboard);
});

module.exports = router;
