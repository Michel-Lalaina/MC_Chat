// src/pages/UserList.tsx
import { Avatar } from "@mui/material";

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
    <div
      className="
        h-full 
        w-full 
        bg-white 
        border-r 
        overflow-y-auto 
        flex 
        flex-col
      "
    >
      {/* Header */}
      <div
        className="
          bg-gradient-to-r 
          from-pink-600 
          to-orange-500 
          p-5 
          text-white 
          flex 
          items-center 
          gap-4
        "
      >
        <Avatar sx={{ width: 60, height: 60 }} />

        <div>
          <h2 className="text-xl font-bold">David Jones</h2>
          <p className="text-sm opacity-90">England - UK</p>
        </div>
      </div>

      {/* Contacts */}
      <div className="p-4 flex-1">
        {contacts.map((c) => (
          <div
            key={c.name}
            className="
              flex 
              items-center 
              gap-4 
              p-3 
              border-b 
              last:border-none 
              cursor-pointer 
              hover:bg-gray-100 
              rounded-lg 
              transition
            "
          >
            <Avatar />
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">{c.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
