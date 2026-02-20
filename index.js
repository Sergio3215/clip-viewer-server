const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: "*",
}));
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.post("/api/clip/", (req, res) => {
    let { clipId, channel, raider, clipTitle, bgColor } = req.body;
    // console.log("ClipID", clipId);

    if (bgColor == undefined || bgColor == null) {
        bgColor = "#020617";
    }

    io.emit("clip", { clipId, channel, raider, clipTitle, bgColor });

    if (clipId) {
        res.send(`ClipID ${clipId} enviado`);
    } else {
        res.send("No clip ID");
    }

});


server.listen(process.env.PORT || 3000, () => {
    console.log("listening on *:" + (process.env.PORT || 3000));
});

//Websocket
io.on("connection", (socket) => {
    console.log("✅ Nuevo widget conectado:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Widget desconectado");
    });
});

