const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const gameRouter = require('./routes/game');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());
app.use(cors());

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join game room
  socket.on('joinRoom', (gameId) => {
    socket.join(gameId);
    console.log(`User joined game room: ${gameId}`);
  });

  // Leave game room
  socket.on('leaveRoom', (gameId) => {
    socket.leave(gameId);
    console.log(`User left game room: ${gameId}`);
  });

  // Handle game events
  gameRouter.handleGameEvents(socket, io);
});

// Routes
app.use('/api/game', gameRouter);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
