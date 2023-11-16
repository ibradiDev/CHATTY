const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const msgRoutes = require('./routes/msgRoutes');
const { Socket, Server } = require('socket.io');
const { createServer } = require('node:http');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite')

const app = express();
const httpServer = createServer(app);

dotenv.config();

app.use(cors());
app.use(express.json());

// Définition des routes
app.use('/api/auth', userRoutes)
app.use('/api/messages', msgRoutes)


/* const connectSqliteDB = async () => {

    const db = await open({
        filename: 'messages.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT
        );
        
        CREATE TABLE IF NOT EXISTS messages(
            message TEXT,
            sender INTEGER,
            receiver INTEGER
        );`);
}

connectSqliteDB() */

// Connection à la BD Mongo
mongoose.connect(process.env?.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('DB connected'); })
    .catch((err) => { console.error(`Error : ${err.message}`); });

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
});

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
    connectionStateRecovery: true,

});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        console.log(data);
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket)
            socket.to(sendUserSocket).emit("msg-receive", data.message);
    })
});