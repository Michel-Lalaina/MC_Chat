import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const socket = io("http://localhost:3001");

interface ChatMessage {
  text: string;
}

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [list, setList] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data: string) => {
      setList((prev) => [...prev, { text: data }]);
    });
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send_message", message);
    setMessage("");
  };

  return (
    <div className="w-full flex flex-col items-center p-6 gap-4">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardContent className="flex flex-col gap-4">
          <Typography variant="h5" className="text-center font-bold">
            Chat en temps réel
          </Typography>

          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-xl">
            {list.map((msg, i) => (
              <div key={i} className="p-2 bg-white shadow-sm rounded-xl border">
                <Typography>{msg.text}</Typography>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" onClick={sendMessage}>
              Envoyer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}