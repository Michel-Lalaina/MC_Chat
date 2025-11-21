import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import MessageBubble from "./MessageBubble";
import { Message } from "../types/Message";

export default function ChatWindow() {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
