import { Server, Socket } from "socket.io";

// ✅ Tracks all active rooms
const rooms: Record<
    string,
    { type: "public" | "private"; users: string[]; maxUsers: number }
> = {};

// ✅ Utility: create a random 4-digit code for private rooms
function generateRoomCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// ✅ Handles a single socket’s life cycle
export function handleSocketConnection(io: Server, socket: Socket) {
    console.log("🔌 New socket connected:", socket.id);

    // Each socket keeps track of which room it’s in
    let currentRoom: string | null = null;

    /* ───────────────────────────────
     🟢 Join a public room (max 3 users)
    ─────────────────────────────── */
    socket.on("joinPublic", () => {
        // find a room with available slot
        let foundRoom = Object.keys(rooms).find(
            (r) => rooms[r].type === "public" && rooms[r].users.length < 3
        );

        if (!foundRoom) {
            // create new public room if none available
            foundRoom = `public-${Object.keys(rooms).length + 1}`;
            rooms[foundRoom] = { type: "public", users: [], maxUsers: 3 };
        }

        const roomData = rooms[foundRoom];
        roomData.users.push(socket.id);
        currentRoom = foundRoom;
        socket.join(foundRoom);

        const userNumber = roomData.users.length; // 1,2,3
        socket.emit("joinedRoom", { room: foundRoom, user: `User ${userNumber}` });
        io.to(foundRoom).emit("roomUpdate", roomData.users.length);
        io.to(foundRoom).emit("receiveMessage", { content: `User ${userNumber} joined`, senderId: "system" });
    });

    /* ───────────────────────────────
     🔵 Create a private room (max 2 users)
    ─────────────────────────────── */
    socket.on("createRoom", () => {
        const code = generateRoomCode();
        rooms[code] = { type: "private", users: [socket.id], maxUsers: 2 };
        currentRoom = code;
        socket.join(code);
        socket.emit("roomCreated", code);
        socket.emit("joinedRoom", { room: code, user: "User 1" });
        console.log(`Private room created: ${code}`);
    });

    /* ───────────────────────────────
     🟣 Join existing private room
    ─────────────────────────────── */
    socket.on("joinRoom", (code: string) => {
        const room = rooms[code];
        if (!room) {
            socket.emit("errorMessage", "Room not found");
            return;
        }
        if (room.users.length >= room.maxUsers) {
            socket.emit("errorMessage", "Room is full");
            return;
        }

        room.users.push(socket.id);
        currentRoom = code;
        socket.join(code);
        const userNumber = room.users.length; // 1 or 2
        socket.emit("joinedRoom", { room: code, user: `User ${userNumber}` });
        io.to(code).emit("roomUpdate", room.users.length);
        io.to(code).emit("receiveMessage", { content: `User ${userNumber} joined`, senderId: "system" });
    });

    /* ───────────────────────────────
     💬 Handle messages inside any room
    ─────────────────────────────── */
    socket.on("sendMessage", (message: string) => {
        if (!currentRoom) return;
        io.to(currentRoom).emit("receiveMessage", { content: message, senderId: socket.id });
    });

    /* ───────────────────────────────
     ❌ When user disconnects
    ─────────────────────────────── */
    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
        if (!currentRoom) return;

        const room = rooms[currentRoom];
        if (!room) return;

        // remove user
        room.users = room.users.filter((id) => id !== socket.id);
        io.to(currentRoom).emit("receiveMessage", { content: "A user left", senderId: "system" });

        // delete room if empty
        if (room.users.length === 0) {
            delete rooms[currentRoom];
            console.log(`Room ${currentRoom} deleted`);
        } else {
            io.to(currentRoom).emit("roomUpdate", room.users.length);
        }
    });
}
