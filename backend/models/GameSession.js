class GameSession {
  constructor(gameId, host) {
    this.gameId = gameId;
    this.host = host;
    this.players = new Set();
    this.questions = [];
    this.currentQuestionIndex = -1;
    this.leaderboard = [];
  }

  addPlayer(playerId) {
    this.players.add(playerId);
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
  }

  createSession(playerId, questions) {
    this.addPlayer(playerId);
    this.questions = questions;
    this.currentQuestionIndex = -1;
    this.leaderboard = [];
  }

  joinSession(playerId) {
    this.addPlayer(playerId);
  }

  startGame() {
    this.currentQuestionIndex = -1;
    this.leaderboard = [];
  }

  getNextQuestion() {
    this.currentQuestionIndex++;
    return this.questions[this.currentQuestionIndex];
  }

  updateLeaderboard(answers) {
    this.leaderboard.push(answers);
  }
}

module.exports = GameSession;
