import { useUser } from "../context/UserContext";
import { Message } from "../types/Message";

export default function MessageBubble({ message }: { message: Message }) {
  const { username } = useUser();

  const isMine = message.user === username;

  return (
    <div className={`flex my-2 ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 max-w-xs rounded-2xl shadow 
        ${isMine ? "bg-blue-500 text-white" : "bg-white"}`}
      >
        <p className="font-bold">{message.user}</p>
        <p>{message.text}</p>
        <span className="text-xs opacity-70">{message.time}</span>
      </div>
    </div>
  );
}
