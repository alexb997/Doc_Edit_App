const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const documentRoutes = require('./routes/documents');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // React app URL
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/collaborative-doc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', documentRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinDocument', (documentId) => {
    socket.join(documentId);
    console.log(`User ${socket.id} joined document ${documentId}`);
  });

  socket.on('editDocument', async ({ documentId, content }) => {
    socket.to(documentId).emit('documentUpdate', content);

    await Document.findByIdAndUpdate(documentId, { content });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
