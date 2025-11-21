import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { TextField, Button } from "@mui/material";
import { useUser } from "../context/UserContext";

export default function MessageInput() {
  const socket = useSocket();
  const { username } = useUser();
  const [text, setText] = useState("");

  const send = () => {
    if (!text) return;

    socket.emit("send_message", {
      user: username,
      text,
      time: new Date().toLocaleTimeString(),
    });

    setText("");
  };

  return (
    <div className="p-4 bg-white flex gap-2">
      <TextField
        fullWidth
        value={text}
        label="Message…"
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={send}>
        Envoyer
      </Button>
    </div>
  );
}
