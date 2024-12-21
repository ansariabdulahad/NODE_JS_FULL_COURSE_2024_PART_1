import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));  

const users = new Set();

io.on("connection", (socket) => {
    console.log("A user is now connected");

    // handle user when they join
    socket.on("join", (userName) => {
        socket.userName = userName;
        users.add(userName);

        io.emit("userJoined", userName);

        io.emit("usersList", Array.from(users));
    });

    // handle incomming chat messages
    socket.on("chatMessage", (message) => {
        io.emit("chatMessage", message);
    })

    // handle user disconnection    
    socket.on("disconnect", ()=> {
        console.log(`An user is disconnected ${socket.userName}`);
        users.forEach(user => {
            if (user === socket.userName) {
                users.delete(user);

                io.emit("left", (user));
                io.emit("usersList", Array.from(users));
            }
        })
    })
})

const PORT = 3000;

server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`listening on ${PORT}`);
});