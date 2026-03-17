import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { initSocket } from "./sockets/socket.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*"},
});

initSocket(io);

server.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});

