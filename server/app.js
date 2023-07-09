const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors : true
    // cors: {
    //   origin: "http://localhost:8080",
    //   methods: ["GET", "POST"],
    //   allowedHeaders: ["Content-Type"],
    //   credentials: true
    // }
  });

var position = {
    x: 200,
    y: 200
};

app.use(cors()); // Add CORS middleware
io.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x -= 5;
                io.emit("position", position);
                break;
            case "right":
                position.x += 5;
                io.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                io.emit("position", position);
                break;
            case "down":
                position.y += 5;
                io.emit("position", position);
                break;
        }
    });
});

server.listen(3000, () => {
    console.log("Listening at :3000...");
});
