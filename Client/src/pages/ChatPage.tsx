// import ChatWindow from "../components/ChatWindow";
// import UserList from "../components/UserList";

// export default function ChatPage() {
//   return (
//     <div className="h-screen w-screen overflow-hidden grid grid-cols-4">

//       {/* Sidebar utilisateur */}
//       <div className="col-span-1 bg-gray-200 overflow-y-auto">
//         <UserList />
//       </div>

//       {/* Zone chat */}
//       <div className="col-span-3 flex flex-col overflow-hidden">

//         {/* ChatWindow doit prendre tout l'espace vertical disponible */}
//         <div className="flex-1 overflow-y-auto">
//           <ChatWindow />
//         </div>


//       </div>

//     </div>
//   );
// }

// src/pages/ChatPage.tsx
import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import UserList from "../components/UserList";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-4">

      {/* Sidebar utilisateur */}
      <div className="col-span-1 bg-gray-200 overflow-y-auto">
        <UserList onSelectUser={setSelectedUser} />
      </div>

      {/* Zone chat */}
      <div className="col-span-3 flex flex-col overflow-hidden  h-full bg-gradient-to-br from-pink-500 to-orange-500 p-2">

        {selectedUser ? (
          <div className="flex-1 overflow-hidden">
            <ChatWindow
              friendname={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Sélectionne un contact pour commencer à discuter
          </div>
        )}

      </div>

    </div>
  );
}
