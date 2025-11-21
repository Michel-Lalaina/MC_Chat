import { createContext, useState, useContext } from "react";

interface UserContextValue {
  username: string;
  setUsername: (name: string) => void;
}

const UserContext = createContext<UserContextValue>({
  username: "",
  setUsername: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
