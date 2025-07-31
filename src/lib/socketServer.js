import { Server } from "socket.io";

let io;

// Store connected peers
const peers = {};

export default function SocketHandler(req, res) {
  if (!io) {
    // Initialize Socket.io server
    io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Store the peer ID when a user connects
      socket.on("register", (peerId) => {
        peers[peerId] = socket.id;
        socket.peerId = peerId;
        console.log(`Peer registered: ${peerId}`);
      });

      // Handle call initiation
      socket.on("call-user", (data) => {
        const { to, offer, callerId, callerName } = data;
        if (peers[to]) {
          io.to(peers[to]).emit("call-made", {
            offer,
            callerId,
            callerName,
            socket: socket.id,
          });
        }
      });

      // Handle call answer
      socket.on("make-answer", (data) => {
        const { to, answer } = data;
        if (peers[to]) {
          io.to(peers[to]).emit("answer-made", {
            answer,
            socket: socket.id,
          });
        }
      });

      // Handle ICE candidates
      socket.on("ice-candidate", (data) => {
        const { to, candidate } = data;
        if (peers[to]) {
          io.to(peers[to]).emit("ice-candidate", {
            candidate,
            socket: socket.id,
          });
        }
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        if (socket.peerId) {
          delete peers[socket.peerId];
        }
      });
    });

    // Attach io to res.socket.server
    res.socket.server.io = io;
  }
  res.end();
}
