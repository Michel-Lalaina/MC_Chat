// import { useEffect, useState } from "react";
// import { useSocket } from "../context/SocketContext";
// import MessageBubble from "./MessageBubble";
// import { Message } from "../types/Message";

// export default function ChatWindow() {
//   const socket = useSocket();
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socket.on("receive_message", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//   }, []);

//   return (
//     <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
//       {messages.map((msg) => (
//         <MessageBubble key={msg.id} message={msg} />
//       ))}
//     </div>
//   );
// }
// src/pages/ChatPage.tsx
import { Avatar, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const messages = [
  { from: "other", text: "Hello!" },
  { from: "me", text: "Hi Noah! How are You?" },
  { from: "other", text: "I'm good David. Are You free this Friday night?" },
  { from: "me", text: "I have an appointment but it will finish at 7 pm. Why?" },
  { from: "other", text: "Oh great! If you do not mind, I invite you at my graduation party." },
  { from: "me", text: "Really? It will be so great. Of course I will come!" },
  { from: "other", text: "Thank you Noah. I will wait for You!" },
  { from: "me", text: "Okay, see You!" },
];

export default function ChatWindow() {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-orange-500">
      <div className="w-[360px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-orange-500 p-4 text-white flex items-center gap-4">
          <IconButton>
            <ArrowBackIosNewIcon htmlColor="white" />
          </IconButton>
          <Avatar />
          <div>
            <h2 className="font-semibold text-lg">Noah Loren</h2>
            <p className="text-sm opacity-90">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-orange-200/40 to-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-4 ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] shadow-md ${
                  msg.from === "me"
                    ? "bg-white text-gray-900"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white flex items-center gap-2 border-t">
          <TextField
            fullWidth
            placeholder="Écrire un message..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          <IconButton color="primary">
            <SendIcon />
          </IconButton>
        </div>

      </div>
    </div>
  );
}
