const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http')
const socket = require('socket.io');
require('dotenv').config();

const server = http.createServer(app)
const io = socket(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});


const db = require('./db/database');
const Image = require('./models/image-model');
const User = require('./models/user-model');
const Message = require('./models/message-model');
const Chat = require('./models/chat-model');
const ArchivedMessage = require('./models/archive-message-model')

const userRoutes = require('./routes/user-route');
const messageRoutes = require('./routes/message-route');
const groupRoutes = require('./routes/group-route');

const cronJob = require('./cron/cronJob');
const path = require('path');

cronJob.start();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/group', groupRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })
}

io.on('connection', socket => {
    socket.on('join-chat', (chatId) => {
        socket.join(chatId);
    })

    socket.on('send-message', (chatId, message) => {
        socket.to(chatId).emit("receive-message", message)
    })
})


db.sync(
    // { force: true }
).then((result) => {
    server.listen(3000)
}).catch(err => console.log(err));
