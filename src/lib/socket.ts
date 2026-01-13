"use client";

import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

/**
 * Creates a Socket.IO client connection.
 * 
 * In production, set the NEXT_PUBLIC_SOCKET_URL environment variable 
 * to your Socket.IO server URL (e.g., "https://your-socket-server.railway.app").
 * 
 * In development, no URL is needed as the client connects to the same origin.
 */
export function createSocket(): Socket {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

    // If URL is provided, connect to it; otherwise use same origin (dev mode)
    const socket = socketUrl
        ? io(socketUrl, {
            transports: ["websocket", "polling"],
            withCredentials: true,
        })
        : io({
            transports: ["websocket", "polling"],
        });

    return socket;
}
