// src/pages/LoginPage.jsx
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { setUsername } = useUser();
  const navigate = useNavigate();


  const handleLogin = () => {
    if (!name.trim()) return;
    setUsername(name);
    navigate("/chatpage");
  };


  return (
    <div className="w-screen flex items-center justify-center h-screen relative overflow-hidden">
      {/* fond gradient animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-gradient-xl" />

      {/* Card en glassmorphism */}
      <div className="relative backdrop-blur-xl bg-white/10 shadow-xl rounded-3xl p-8 w-[340px] animate-fadeIn">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Choisis ton pseudo
        </h2>

        <TextField
          fullWidth
          label="Nom utilisateur"
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: "14px",
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "none",
            transition: "0.25s",
            background: "linear-gradient(to right, #ff4dff, #6a5af9)",
            "&:hover": {
              transform: "scale(1.03)",
              background: "linear-gradient(to right, #ff3bff, #5948f7)",
            },
          }}
            onClick={handleLogin}
        >
          Entrer dans le chat
        </Button>

      </div>

      {/* animations */}
      <style>{`
        .animate-gradient-xl {
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
          from { opacity: 0; transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
