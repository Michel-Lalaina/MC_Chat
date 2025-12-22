
// import { Avatar, IconButton, TextField } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// const messages = [
//   { from: "other", text: "Hello!" },
//   { from: "me", text: "Hi Noah! How are You?" },
//   { from: "other", text: "I'm good David. Are You free this Friday night?" },
//   { from: "me", text: "I have an appointment but it will finish at 7 pm. Why?" },
//   { from: "other", text: "Oh great! If you do not mind, I invite you at my graduation party." },
//   { from: "me", text: "Really? It will be so great. Of course I will come!" },
//   { from: "other", text: "Thank you Noah. I will wait for You!" },
//   { from: "me", text: "Okay, see You!" },
// ];

// export default function ChatWindow() {
//       // const { friendname } = useUser();
//   return (
//     <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-orange-500 p-2">

//       {/* Mobile-first container */}
//       <div className="
//         w-full 
//         max-w-[480px] 
//         bg-white 
//         rounded-2xl 
//         shadow-xl 
//         overflow-hidden 
//         flex flex-col
//       ">

//         {/* Header */}
//         <div className="
//           bg-gradient-to-r from-pink-600 to-orange-500 
//           p-3 sm:p-4 
//           text-white 
//           flex items-center 
//           gap-3 sm:gap-4
//         ">
//           <IconButton>
//             <ArrowBackIosNewIcon htmlColor="white" />
//           </IconButton>

//           <Avatar sx={{ width: 40, height: 40 }} className="sm:!w-12 sm:!h-12" />

//           <div>
//                     <h2 className="font-semibold text-base sm:text-lg">
//               {/* {friendname || "Utilisateur"} */}
//             </h2>
//             <p className="text-xs sm:text-sm opacity-90">Online</p>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="
//           flex-1 
//           p-3 sm:p-4 
//           overflow-y-auto 
//           bg-gradient-to-b from-orange-200/40 to-white
//         ">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex mb-3 sm:mb-4 ${
//                 msg.from === "me" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl max-w-[75%] shadow-md ${
//                   msg.from === "me"
//                     ? "bg-white text-gray-900"
//                     : "bg-gray-200 text-gray-900"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="
//           p-2 sm:p-3 
//           bg-white 
//           flex items-center 
//           gap-2 sm:gap-3 
//           border-t
//         ">
//           <TextField
//             fullWidth
//             placeholder="Écrire un message..."
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//                 paddingRight: "0 !important",
//               },
//               "& input": {
//                 fontSize: "0.85rem",
//               },
//               "@media (min-width: 640px)": {
//                 "& input": {
//                   fontSize: "1rem",
//                 },
//               },
//             }}
//           />

//           <IconButton color="primary">
//             <SendIcon />
//           </IconButton>
//         </div>

//       </div>
//     </div>
//   );
// }



// src/components/ChatWindow.tsx
import { Avatar, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";

/* =======================
   Types
======================= */
interface Message {
  from: "me" | "other";
  text: string;
}

interface ChatWindowProps {
  friendname: string;
  onClose?: () => void;
}

/* =======================
   Initial data
======================= */
const initialMessages: Message[] = [
  { from: "other", text: "Hello!" },
  { from: "me", text: "Hi! How are you?" },
];

/* =======================
   Component
======================= */
export default function ChatWindow({
  friendname,
  onClose,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");

  const handleSend = (): void => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "me", text: input }]);
    setInput("");

    // Simulation réponse automatique
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "other", text: "Message reçu 👍" },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full flex items-center justify-center h-full bg-gradient-to-br from-pink-500 to-orange-500 p-2">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-orange-500 p-3 sm:p-4 text-white flex items-center gap-3 sm:gap-4">
          <IconButton onClick={onClose}>
            <ArrowBackIosNewIcon htmlColor="white" />
          </IconButton>

          <Avatar sx={{ width: 40, height: 40 }} />

          <div>
            <h2 className="font-semibold text-base sm:text-lg">
              {friendname}
            </h2>
            <p className="text-xs sm:text-sm opacity-90">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gradient-to-b from-orange-200/40 to-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-3 ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-xl max-w-[75%] shadow-md ${
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
        <div className="p-2 sm:p-3 bg-white flex items-center gap-2 border-t">
          <TextField
            fullWidth
            placeholder="Écrire un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                paddingRight: "0 !important",
              },
            }}
          />

          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </div>

      </div>
    </div>
  );
}
