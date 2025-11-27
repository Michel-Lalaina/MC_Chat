import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import UserList from "../components/UserList";

export default function ChatPage() {
  
  return (
    <div className="grid grid-cols-4 h-screen">
      
      <div className="col-span-1 bg-gray-200 p-4">
        <UserList />
      </div>

      <div className="col-span-3 flex flex-col">
        <ChatWindow />
        <MessageInput />
      </div>

    </div>
  );
}
