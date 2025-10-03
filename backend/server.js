const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 WhatPay API Running!',
    version: '1.0.0',
    services: ['auth', 'chat', 'p2p', 'wallet']
  });
});

// Sistema de autenticación
app.post('/api/auth/register', (req, res) => {
  const { email, password, facialData } = req.body;
  // TODO: Implementar registro con verificación facial
  res.json({ message: 'User registration endpoint', status: 'development' });
});

// Sistema de chat
app.post('/api/chat/send', (req, res) => {
  const { message, chatId, encryptionKey } = req.body;
  res.json({ message: 'Chat message endpoint', status: 'development' });
});

// Socket.io para mensajería en tiempo real
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
    console.log(`Usuario ${socket.id} unido al chat ${chatId}`);
  });

  socket.on('send-message', (data) => {
    io.to(data.chatId).emit('new-message', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 WhatPay Server running on port ${PORT}`);
  console.log(`📧 Services: Auth, Chat, P2P, Wallet`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});