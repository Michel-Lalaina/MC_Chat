// src/pages/ContactsPage.tsx
import { Avatar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const contacts = [
  { name: "Noah Loren", status: "Hello!" },
  { name: "Angelica", status: "Lorem ipsum dolor sit amet" },
  { name: "Jessica", status: "Lorem ipsum dolor sit amet" },
  { name: "Paul", status: "Lorem ipsum dolor sit amet" },
  { name: "Joan", status: "Lorem ipsum dolor sit amet" },
  { name: "Hannah", status: "Lorem ipsum dolor sit amet" },
];

export default function UserList() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-orange-500">
      <div className="w-[360px] bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-orange-500 p-6 text-white flex items-center gap-4">
          <Avatar sx={{ width: 56, height: 56 }} />
          <div>
            <h2 className="text-xl font-bold">David Jones</h2>
            <p className="text-sm opacity-80">England - UK</p>
          </div>
        </div>

        {/* Contacts */}
        <div className="p-4 bg-white">
          {contacts.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 py-3 border-b last:border-none cursor-pointer hover:bg-gray-100 rounded-lg px-2"
            >
              <Avatar />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="bg-gradient-to-r from-pink-600 to-orange-500 flex justify-around p-3 text-white">
          <IconButton>
            <HomeIcon htmlColor="white" />
          </IconButton>
          <IconButton>
            <SearchIcon htmlColor="white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

