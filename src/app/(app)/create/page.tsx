"use client";

import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

export default function CreateRoomPage() {
    const [socket, setSocket] = useState<any>(null);
    const [roomCode, setRoomCode] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ content: string; senderId: string }[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        newSocket.on("roomCreated", (code: string) => setRoomCode(code));
        newSocket.on("joinedRoom", (data: { room: string; user: string }) => {
            console.log(`Joined ${data.room} as ${data.user}`);
        });
        newSocket.on("receiveMessage", (data: { content: string; senderId: string }) =>
            setMessages((prev) => [...prev, data])
        );

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const createRoom = () => socket?.emit("createRoom");
    const sendMessage = () => {
        if (!input.trim()) return;
        socket?.emit("sendMessage", input);
        setInput("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Create Private Room</h1>

            {!roomCode ? (
                <button
                    onClick={createRoom}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                    Create Room
                </button>
            ) : (
                <>
                    <p className="mb-4">Room Code: <span className="text-green-400 font-bold">{roomCode}</span></p>
                    <div className="bg-gray-800 p-4 w-full max-w-md rounded-lg h-72 overflow-y-auto flex flex-col">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`mb-2 p-2 rounded-lg max-w-[80%] break-words ${msg.senderId === "system"
                                    ? "bg-transparent text-gray-400 text-center w-full"
                                    : msg.senderId === socket?.id
                                        ? "bg-indigo-600 ml-auto text-right"
                                        : "bg-gray-700 mr-auto text-left"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    <div className="flex w-full max-w-md mt-4 gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                            className="flex-grow px-3 py-2 rounded-lg"
                        />
                        <button onClick={sendMessage} className="px-4 py-2 border border-gray-700 bg-indigo-600 rounded-lg">
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
