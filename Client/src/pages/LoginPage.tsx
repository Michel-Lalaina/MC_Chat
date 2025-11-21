import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name) return;
    setUsername(name);
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">Choisir un pseudo</h2>

        <TextField
          fullWidth
          label="Nom utilisateur"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          className="mt-4"
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          Entrer dans le chat
        </Button>
      </Card>
    </div>
  );
}
