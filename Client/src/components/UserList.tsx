import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export default function UserList() {
  const socket = useSocket();
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("users_update", (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <h3 className="font-semibold mb-2">Membres connectés</h3>

      <ul className="space-y-1">
        {users.map((u, i) => (
          <li key={i} className="bg-white p-2 rounded shadow">
            {u}
          </li>
        ))}
      </ul>
    </div>
  );
}
