import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import UserList from "../components/UserList";

export default function ChatPage() {
  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-4">

      {/* Sidebar utilisateur */}
      <div className="col-span-1 bg-gray-200 overflow-y-auto">
        <UserList />
      </div>

      {/* Zone chat */}
      <div className="col-span-3 flex flex-col overflow-hidden">

        {/* ChatWindow doit prendre tout l'espace vertical disponible */}
        <div className="flex-1 overflow-y-auto">
          <ChatWindow />
        </div>

        {/* Input fixé en bas
        <div className="border-t bg-white">
          <MessageInput />
        </div> */}

      </div>

    </div>
  );
}
