import next from "next";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { handleSocketConnection } from "./socketManager";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Prepare Next.js app first
nextApp.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  // Attach Socket.IO to HTTP server
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // You can restrict this later for security
    },
  });

  // When a new socket connects
  io.on("connection", (socket) => {
    console.log(`✅ New socket connected: ${socket.id}`);
    handleSocketConnection(io, socket); // pass to your socket manager logic
  });

  // Start server on port
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
