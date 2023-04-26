const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8000",
    },
});

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
