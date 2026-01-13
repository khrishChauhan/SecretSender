"use client";

import { createSocket } from "@/lib/socket";
import React, { useEffect, useState } from "react";

export default function JoinRoomPage() {
  const [socket, setSocket] = useState<any>(null);
  const [roomCode, setRoomCode] = useState("");
  const [messages, setMessages] = useState<{ content: string; senderId: string }[]>([]);
  const [input, setInput] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const newSocket = createSocket();
    setSocket(newSocket);

    newSocket.on("joinedRoom", (data: { room: string; user: string }) => {
      console.log(`Joined ${data.room} as ${data.user}`);
      setIsJoined(true);
      setMessages((prev) => [...prev, { content: "You joined this room", senderId: "system" }]);
    });
    newSocket.on("receiveMessage", (data: { content: string; senderId: string }) =>
      setMessages((prev) => [...prev, data])
    );
    newSocket.on("errorMessage", (msg: string) => alert(msg));

    return () => {
      newSocket.disconnect();
    }
  }, []);

  const joinRoom = () => {
    if (roomCode.trim().length !== 4) return alert("Enter valid 4-digit code");
    socket?.emit("joinRoom", roomCode.trim());
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    socket?.emit("sendMessage", input);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Join Private Room</h1>

      {!isJoined && (
        <div className="flex gap-2 mb-4">
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter Code"
            className="px-3 py-2 border border-gray-700  rounded-lg text-center w-28"
          />
          <button
            onClick={joinRoom}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
          >
            Join Room
          </button>
        </div>
      )}

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
          className="flex-grow px-3 py-2 border border-gray-700 rounded-lg "
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-indigo-600 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
