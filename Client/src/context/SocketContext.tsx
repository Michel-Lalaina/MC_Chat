import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3001");

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
