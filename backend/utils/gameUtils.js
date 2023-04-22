const fetch = require('node-fetch');

async function getTriviaQuestion(difficulty) {
  const response = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`);
  const data = await response.json();
  const questionData = data.results[0];
  const question = questionData.question;
  const correctAnswer = questionData.correct_answer;
  const incorrectAnswers = questionData.incorrect_answers;
  const answers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
  return {
    question,
    answers,
    correctAnswer
  };
}

class GameSession {
  constructor(sessionId, hostName, gameCode) {
    this.sessionId = sessionId;
    this.hostName = hostName;
    this.gameCode = gameCode;
    this.players = [];
    this.currentQuestionIndex = 0;
    this.questionData = [];
    this.scoreData = {};
  }

  async loadQuestions(difficulty) {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const question = await getTriviaQuestion(difficulty);
      questions.push(question);
    }
    this.questionData = questions;
  }

  addPlayer(playerName, playerId) {
    this.players.push({
      name: playerName,
      id: playerId,
      score: 0
    });
    this.scoreData[playerId] = 0;
  }

  removePlayer(playerId) {
    const index = this.players.findIndex(player => player.id === playerId);
    if (index !== -1) {
      this.players.splice(index, 1);
      delete this.scoreData[playerId];
    }
  }

  getPlayerNames() {
    return this.players.map(player => player.name);
  }

  getCurrentQuestion() {
    return this.questionData[this.currentQuestionIndex];
  }

  submitAnswer(playerId, answerIndex) {
    const player = this.players.find(player => player.id === playerId);
    if (player) {
      const currentQuestion = this.questionData[this.currentQuestionIndex];
      if (currentQuestion.answers[answerIndex] === currentQuestion.correctAnswer) {
        const score = this.scoreData[playerId];
        this.scoreData[playerId] = score + 1;
        player.score += 1;
      }
    }
  }

  getNextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questionData.length) {
      return null;
    }
    return this.getCurrentQuestion();
  }

  getLeaderboard() {
    const sortedPlayers = [...this.players].sort((player1, player2) => player2.score - player1.score);
    return sortedPlayers.map(player => ({
      name: player.name,
      score: player.score
    }));
  }
}

module.exports = {
  GameSession,
  getTriviaQuestion
};
